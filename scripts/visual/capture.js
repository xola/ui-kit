/**
 * Captures a screenshot and an aria snapshot of every story in a local static Storybook build or a
 * deployed Storybook.
 *
 *   node scripts/visual/capture.js --out <dir> [--static <dir> | --url <origin>] [--filter <substring>] [--map <json>]
 *
 * The production baseline is captured from the deployed Storybook, and `--map` renames production
 * story ids to the current ids so both captures can be compared story for story:
 *
 *   node scripts/visual/capture.js --url https://ui.xola.io --map story-map.json --out .visual/baseline
 *   npm run build:storybook && npm run visual:capture
 *   npm run visual:compare
 *
 * `--map` is a JSON object shaped as `{ "production-story-id": "current-story-id" }`, passed inline
 * or as a path to a .json file; a mapped story is written under the current id.
 */
import fs from "node:fs/promises";
import { createReadStream, existsSync, readFileSync } from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { chromium } from "playwright";

const MAX_RESIZE_PASSES = 3;
const STORY_TIMEOUT_MS = 30_000;
const VIEWPORT = { width: 1280, height: 800 };
const MOBILE_VIEWPORT = { width: 375, height: 812 };
const FIXED_TIME = new Date("2026-01-15T12:00:00Z");

const CONTENT_TYPES = {
    ".css": "text/css",
    ".otf": "font/otf",
    ".ttf": "font/ttf",
    ".gif": "image/gif",
    ".png": "image/png",
    ".html": "text/html",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".ico": "image/x-icon",
    ".woff": "font/woff",
    ".js": "text/javascript",
    ".mjs": "text/javascript",
    ".json": "application/json",
    ".svg": "image/svg+xml",
    ".woff2": "font/woff2",
};

const normalizeUrl = (url) => {
    let parsed;

    try {
        parsed = new URL(url);
    } catch {
        throw new Error(`--url must be an http(s) URL, got ${url}`);
    }

    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        throw new Error(`--url must be an http(s) URL, got ${url}`);
    }

    return url.replace(/\/+$/, "");
};

const parseStoryMap = (map) => {
    if (map === undefined) {
        return {};
    }

    let source = map;

    if (!source.trim().startsWith("{")) {
        try {
            source = readFileSync(path.resolve(map), "utf8");
        } catch {
            throw new Error(`--map ${map} is neither inline JSON nor a readable .json file`);
        }
    }

    let parsed;

    try {
        parsed = JSON.parse(source);
    } catch (error) {
        throw new Error(`--map is not valid JSON: ${error.message}`);
    }

    const isIdMap =
        parsed !== null &&
        typeof parsed === "object" &&
        !Array.isArray(parsed) &&
        Object.values(parsed).every((id) => typeof id === "string");

    if (!isIdMap) {
        throw new Error('--map must be an object of string pairs like { "production-story-id": "current-story-id" }');
    }

    if (Object.values(parsed).some((id) => id.length === 0)) {
        throw new Error("--map target ids must not be empty");
    }

    // Two production ids mapped to the same current id would overwrite each other's files mid-capture.
    const hasUniqueTargets = new Set(Object.values(parsed)).size === Object.keys(parsed).length;

    if (!hasUniqueTargets) {
        throw new Error("--map target ids must be unique: two production ids map to the same current id");
    }

    return parsed;
};

export const getOptions = (argv = process.argv.slice(2)) => {
    const { values } = parseArgs({
        args: argv,
        options: {
            out: { type: "string" },
            filter: { type: "string" },
            static: { type: "string" },
            url: { type: "string" },
            map: { type: "string" },
            concurrency: { type: "string", default: "4" },
        },
    });
    const { out, filter, concurrency, static: staticOption, url, map } = values;

    if (!out) {
        throw new Error("Missing --out <dir>, e.g. --out .visual/baseline");
    }

    if (staticOption !== undefined && url !== undefined) {
        throw new Error("--static and --url are mutually exclusive: pass exactly one capture source");
    }

    const outDir = path.resolve(out);
    const visualDir = path.resolve(".visual");
    const relativeOut = path.relative(visualDir, outDir);
    const escapesVisualDir =
        relativeOut === ".." || relativeOut.startsWith(`..${path.sep}`) || path.isAbsolute(relativeOut);

    if (relativeOut === "" || escapesVisualDir) {
        throw new Error(`--out must be a dedicated subdirectory of ${visualDir}, got ${outDir}`);
    }

    const workers = Number.parseInt(concurrency, 10);
    if (!Number.isInteger(workers) || workers < 1) {
        throw new Error(`--concurrency must be a positive integer, got ${concurrency}`);
    }

    const mode = url === undefined ? "static" : "remote";

    return {
        outDir,
        filter,
        workers,
        mode,
        staticDir: mode === "static" ? path.resolve(staticOption ?? "storybook-static") : undefined,
        baseUrl: mode === "remote" ? normalizeUrl(url) : undefined,
        map: parseStoryMap(map),
    };
};

const startServer = (staticDir) => {
    const server = http.createServer(async (request, response) => {
        const { pathname } = new URL(request.url, "http://localhost");
        const relativePath = decodeURIComponent(pathname === "/" ? "/index.html" : pathname);
        const filePath = path.join(staticDir, relativePath);

        if (!filePath.startsWith(staticDir + path.sep)) {
            response.writeHead(403).end();
            return;
        }

        const stat = await fs.stat(filePath).catch(() => undefined);
        if (!stat?.isFile()) {
            response.writeHead(404).end();
            return;
        }

        const contentType = CONTENT_TYPES[path.extname(filePath).toLowerCase()] ?? "application/octet-stream";
        response.writeHead(200, { "Content-Type": contentType, "Content-Length": stat.size });
        createReadStream(filePath).pipe(response);
    });

    return new Promise((resolve) => {
        server.listen(0, "127.0.0.1", () => resolve(server));
    });
};

const readStaticIndex = async (staticDir) => {
    const indexPath = path.join(staticDir, "index.json");
    if (!existsSync(indexPath)) {
        throw new Error(`${indexPath} not found. Run \`npm run build:storybook\` first.`);
    }

    return fs.readFile(indexPath, "utf8");
};

const fetchStorybookIndex = async (baseUrl) => {
    const response = await fetch(`${baseUrl}/index.json`);

    if (!response.ok) {
        throw new Error(`GET ${baseUrl}/index.json failed with ${response.status}`);
    }

    return response.text();
};

const getStoryIds = async ({ mode, staticDir, baseUrl, filter }) => {
    const content = mode === "remote" ? await fetchStorybookIndex(baseUrl) : await readStaticIndex(staticDir);
    const { entries } = JSON.parse(content);

    return Object.values(entries)
        .filter(({ type, id }) => type === "story" && (!filter || id.includes(filter)))
        .map(({ id }) => id)
        .sort();
};

/**
 * Runs inside the Storybook iframe. Mirrors @storybook/test-runner: select the story over the
 * preview channel and settle on STORY_FINISHED, which Storybook 10 emits after the play function
 * and afterEach hooks in both the success and the error path. STORY_RENDERED alone is not enough:
 * a throwing play function rethrows past the "completed" phase, so STORY_RENDERED never fires.
 */
export const renderStoryInPage = ({ storyId, timeoutMs }) => {
    const channel = window.__STORYBOOK_ADDONS_CHANNEL__;
    const errors = [];
    const describe = (error) => error?.message ?? error?.title ?? String(error);

    return new Promise((resolve) => {
        const listeners = {
            storyErrored: ({ title, description }) => errors.push(`storyErrored: ${title} ${description ?? ""}`.trim()),
            storyThrewException: (error) => errors.push(`storyThrewException: ${describe(error)}`),
            playFunctionThrewException: (error) => errors.push(`playFunctionThrewException: ${describe(error)}`),
            unhandledErrorsWhilePlaying: (list) => {
                list.forEach((error) => errors.push(`unhandledErrorsWhilePlaying: ${describe(error)}`));
            },
            storyMissing: (specifier) => {
                if (specifier === storyId) {
                    errors.push(`storyMissing: ${storyId}`);
                    finish();
                }
            },
            storyFinished: ({ storyId: finishedId, status }) => {
                if (finishedId !== storyId) {
                    return;
                }

                if (status === "error" && errors.length === 0) {
                    errors.push("storyFinished with status error");
                }

                finish();
            },
        };

        if (typeof window.__STORYBOOK_PREVIEW__.ready !== "function") {
            listeners.storyRendered = (renderedId) => {
                if (renderedId === storyId) {
                    finish();
                }
            };
        }

        const timer = setTimeout(() => {
            errors.push(`Timed out after ${timeoutMs}ms waiting for storyFinished`);
            finish();
        }, timeoutMs);

        const finish = () => {
            clearTimeout(timer);
            Object.entries(listeners).forEach(([event, listener]) => channel.off(event, listener));
            resolve(errors);
        };

        Object.entries(listeners).forEach(([event, listener]) => channel.on(event, listener));
        channel.emit("setCurrentStory", { storyId, viewMode: "story" });
    });
};

/**
 * Runs inside the Storybook iframe. Remote images (Login backgrounds are CSS background-image URLs
 * on files.xola.com) finish loading after STORY_FINISHED, so wait for every <img> and every
 * computed background-image to load or fail before the screenshot.
 *
 * The synthetic resize dates from the 3.x popover engine, which repositioned only on scroll or
 * window resize, so a menu shown during the Sidebar rail's width transition kept a stale position.
 */
const waitForPaint = async () => {
    window.dispatchEvent(new Event("resize"));

    const backgroundUrls = [...document.querySelectorAll("*")].flatMap((element) => {
        const { backgroundImage } = getComputedStyle(element);
        return [...backgroundImage.matchAll(/url\("?([^")]+)"?\)/g)].map(([, url]) => url);
    });
    const imageUrls = [...document.images].map(({ currentSrc, src }) => currentSrc || src).filter(Boolean);
    const loadImage = (url) => {
        const image = new Image();
        image.src = url;
        return image.decode().catch(() => undefined);
    };

    await Promise.all([...new Set([...backgroundUrls, ...imageUrls])].map(loadImage));
    await document.fonts.ready;
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
};

/**
 * Grows the viewport to the document height so a plain viewport screenshot shows the whole story.
 * Playwright's fullPage mode (and CDP captureBeyondViewport) briefly resizes the window to 1x1 and
 * back while capturing. That crosses the Sidebar's auto-collapse breakpoint, and an open submenu
 * repositions against the collapsed rail mid-capture, so the shot no longer matches the settled page.
 *
 * Layouts tied to the viewport height (h-screen plus padding) grow by exactly the amount the
 * viewport grew on every pass and never converge, so stop as soon as a pass repeats the last growth.
 */
const fitViewportToContent = async (page) => {
    let lastGrowth = 0;

    for (let pass = 0; pass < MAX_RESIZE_PASSES; pass += 1) {
        const { width, height: currentHeight } = page.viewportSize();
        const contentHeight = await page.evaluate(() => {
            const { body, documentElement } = document;
            return Math.max(documentElement.scrollHeight, body.scrollHeight);
        });
        const growth = Math.max(VIEWPORT.height, contentHeight) - currentHeight;

        if (growth <= 0 || growth === lastGrowth) {
            return;
        }

        lastGrowth = growth;
        await page.setViewportSize({ width, height: currentHeight + growth });
    }
};

/**
 * Downshift appends its live region (#a11y-status-message) to document.body lazily, so an empty
 * `- status` node appears in some runs and not others. An empty one carries no accessible content.
 */
const normalizeAriaSnapshot = (snapshot) => {
    return snapshot
        .split("\n")
        .filter((line) => line.trim() !== "- status")
        .join("\n");
};

/**
 * Runs inside the Storybook iframe. The a11y addon's automatic axe pass runs after every story and
 * changes whether the Roboto Mono webfont has landed by screenshot time, so captures switch it to
 * manual. The Storybook Vitest project runs axe instead.
 */
const disableAutomaticA11yRun = () => {
    window.__STORYBOOK_ADDONS_CHANNEL__.emit("updateGlobals", { globals: { a11y: { manual: true } } });
};

/**
 * Runs in every frame before page scripts. Pins "now" so dates in screenshots stay stable, without
 * page.clock: its injected clock fakes requestAnimationFrame, timers, and performance along with
 * Date, so code scheduled on animation frames behaves differently than in a real browser. A Proxy
 * keeps `new Date(args)`, `Date.parse`, `Date.UTC`, `instanceof Date`, and subclassing native.
 */
const pinCurrentDate = (fixedTime) => {
    const NativeDate = Date;
    const now = () => fixedTime;

    globalThis.Date = new Proxy(NativeDate, {
        apply: () => new NativeDate(fixedTime).toString(),
        construct: (target, args, newTarget) =>
            Reflect.construct(target, args.length > 0 ? args : [fixedTime], newTarget),
        get: (target, key, receiver) => (key === "now" ? now : Reflect.get(target, key, receiver)),
    });
};

export const getViewport = (storyId) => (storyId.endsWith("--mobile") ? MOBILE_VIEWPORT : VIEWPORT);

export const readyPreview = () => window.__STORYBOOK_PREVIEW__.ready?.();

const captureStory = async ({ browser, baseUrl, outDir, storyId, outputId }) => {
    const context = await browser.newContext({
        locale: "en-US",
        timezoneId: "UTC",
        reducedMotion: "reduce",
        deviceScaleFactor: 1,
        viewport: getViewport(storyId),
    });
    const page = await context.newPage();
    const errors = [];

    page.setDefaultTimeout(STORY_TIMEOUT_MS);

    try {
        await page.addInitScript(pinCurrentDate, FIXED_TIME.getTime());
        await page.goto(`${baseUrl}/iframe.html`);
        await page.waitForFunction(() => window.__STORYBOOK_PREVIEW__ && window.__STORYBOOK_ADDONS_CHANNEL__);
        await page.evaluate(readyPreview);
        await page.evaluate(disableAutomaticA11yRun);

        errors.push(...(await page.evaluate(renderStoryInPage, { storyId, timeoutMs: STORY_TIMEOUT_MS })));

        await fitViewportToContent(page);
        await page.evaluate(waitForPaint);
        await page.screenshot({ path: path.join(outDir, `${outputId}.png`), caret: "hide", animations: "disabled" });

        const ariaSnapshot = normalizeAriaSnapshot(await page.locator("body").ariaSnapshot());
        await fs.writeFile(path.join(outDir, `${outputId}.aria.yml`), `${ariaSnapshot}\n`);
    } catch (error) {
        errors.push(`capture: ${error.message.split("\n")[0]}`);
    } finally {
        await context.close();
    }

    return errors.length > 0 ? { status: "error", error: errors.join("\n") } : { status: "ok" };
};

/**
 * A full run starts from an empty directory. A --filter run re-captures only the matching stories
 * into an existing capture, so it removes just their files and keeps the rest of the manifest.
 */
const prepareOutDir = async ({ outDir, filter, outputIds }) => {
    const manifestPath = path.join(outDir, "manifest.json");
    if (!filter || !existsSync(manifestPath)) {
        await fs.rm(outDir, { recursive: true, force: true });
        await fs.mkdir(outDir, { recursive: true });
        return {};
    }

    const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
    const staleFiles = outputIds.flatMap((outputId) => [`${outputId}.png`, `${outputId}.aria.yml`]);

    await Promise.all(staleFiles.map((file) => fs.rm(path.join(outDir, file), { force: true })));

    return Object.fromEntries(Object.entries(manifest).filter(([outputId]) => !outputIds.includes(outputId)));
};

const runPool = async (items, workers, task) => {
    const queue = [...items];
    const runWorker = async () => {
        while (queue.length > 0) {
            await task(queue.shift());
        }
    };

    await Promise.all(Array.from({ length: Math.min(workers, items.length) }, runWorker));
};

export const getOutputIds = (storyIds, map) => {
    const unmappedIds = new Set(storyIds.filter((storyId) => map[storyId] === undefined));
    const collisions = [...new Set(Object.values(map).filter((outputId) => unmappedIds.has(outputId)))].sort();

    if (collisions.length > 0) {
        throw new Error(`--map target ids collide with unmapped source ids: ${collisions.join(", ")}`);
    }

    return storyIds.map((storyId) => map[storyId] ?? storyId);
};

const main = async () => {
    const { outDir, filter, workers, mode, staticDir, baseUrl: remoteUrl, map } = getOptions();
    const storyIds = await getStoryIds({ mode, staticDir, baseUrl: remoteUrl, filter });

    if (storyIds.length === 0) {
        throw new Error(`No stories match filter "${filter}"`);
    }

    const getOutputId = (storyId) => map[storyId] ?? storyId;
    const outputIds = getOutputIds(storyIds, map);
    const manifest = await prepareOutDir({ outDir, filter, outputIds });

    const server = mode === "static" ? await startServer(staticDir) : undefined;
    const baseUrl = server === undefined ? remoteUrl : `http://127.0.0.1:${server.address().port}`;
    const browser = await chromium.launch();
    let done = 0;

    const source = mode === "remote" ? remoteUrl : staticDir;

    console.log(`Capturing ${storyIds.length} stories from ${source} to ${outDir} with ${workers} workers`);

    try {
        await runPool(storyIds, workers, async (storyId) => {
            const outputId = getOutputId(storyId);
            const result = await captureStory({ browser, baseUrl, outDir, storyId, outputId });
            const { status, error } = result;
            manifest[outputId] = result;
            done += 1;

            const label = storyId === outputId ? storyId : `${storyId} -> ${outputId}`;
            const suffix = status === "ok" ? "" : `  ERROR ${error.split("\n")[0]}`;
            console.log(`[${done}/${storyIds.length}] ${label}${suffix}`);
        });
    } finally {
        await browser.close();
        server?.close();
    }

    const sortedManifest = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
    await fs.writeFile(path.join(outDir, "manifest.json"), `${JSON.stringify(sortedManifest, null, 4)}\n`);

    const failed = storyIds.filter((storyId) => manifest[getOutputId(storyId)].status === "error");

    if (failed.length > 0) {
        console.error(`\n${failed.length} of ${storyIds.length} stories errored:`);
        failed.forEach((storyId) => console.error(`  ${storyId}: ${manifest[getOutputId(storyId)].error}`));
        process.exitCode = 1;
        return;
    }

    console.log(`\nCaptured ${storyIds.length} stories, no errors.`);
};

const isDirectRun = () =>
    process.argv[1] !== undefined && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectRun()) {
    main().catch((error) => {
        console.error(error.message);
        process.exitCode = 1;
    });
}
