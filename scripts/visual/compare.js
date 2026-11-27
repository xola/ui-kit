/**
 * Compares a baseline capture with a head capture and reports pixel and aria differences.
 *
 *   node scripts/visual/compare.js --base <dir> --head <dir>
 *
 * Differences listed in visual-accepted.json ({ id, kind } pairs, kind "pixel", "size", or "aria")
 * are reported as accepted instead of failing. The HTML report with base/head/diff images and aria
 * snapshots is written to .visual/report.html.
 */
import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

const MAX_DIFF_RATIO = 0.001;
const PIXEL_THRESHOLD = 0.1;
const VISUAL_DIR = path.resolve(".visual");
const ACCEPTED_PATH = path.resolve("visual-accepted.json");

const getOptions = (argv = process.argv.slice(2)) => {
    const { values } = parseArgs({
        args: argv,
        options: {
            base: { type: "string", default: ".visual/baseline" },
            head: { type: "string", default: ".visual/current" },
        },
    });
    const { base, head } = values;
    const baseDir = path.resolve(base);
    const headDir = path.resolve(head);

    [baseDir, headDir].forEach((dir) => {
        if (!existsSync(dir)) {
            throw new Error(`${dir} not found. Capture a baseline and a current run first.`);
        }
    });

    return { baseDir, headDir };
};

const readIfExists = (filePath, encoding) => fs.readFile(filePath, encoding).catch(() => undefined);

const getAccepted = async (acceptedPath) => {
    const content = await readIfExists(acceptedPath, "utf8");

    return content === undefined ? [] : JSON.parse(content);
};

/**
 * capture.js still screenshots a story whose play function threw, so its PNG can match the baseline.
 * The manifest is the only record of the error, and it is written last, so a capture that died
 * midway has none.
 */
const getErroredIds = async (dir) => {
    const content = await readIfExists(path.join(dir, "manifest.json"), "utf8");

    if (content === undefined) {
        throw new Error(`${dir}/manifest.json not found. Rerun the capture that writes ${dir}.`);
    }

    return Object.entries(JSON.parse(content))
        .filter(([, { status }]) => status !== "ok")
        .map(([id]) => id);
};

const getIds = async (dir, extension) => {
    const files = await fs.readdir(dir);

    return files.filter((file) => file.endsWith(extension)).map((file) => file.slice(0, -extension.length));
};

const comparePixels = async ({ id, basePng, headPng, diffDir }) => {
    const base = PNG.sync.read(basePng);
    const head = PNG.sync.read(headPng);

    if (base.width !== head.width || base.height !== head.height) {
        return { sizeMismatch: `${base.width}x${base.height} vs ${head.width}x${head.height}` };
    }

    const { width, height } = base;
    const diff = new PNG({ width, height });
    const differing = pixelmatch(base.data, head.data, diff.data, width, height, { threshold: PIXEL_THRESHOLD });
    const ratio = differing / (width * height);

    if (ratio > MAX_DIFF_RATIO) {
        await fs.writeFile(path.join(diffDir, `${id}.png`), PNG.sync.write(diff));
    }

    return { ratio };
};

const compareStory = async ({ id, baseDir, headDir, diffDir, acceptedKinds, isHeadErrored }) => {
    const basePng = await readIfExists(path.join(baseDir, `${id}.png`));
    const headPng = await readIfExists(path.join(headDir, `${id}.png`));
    const baseAria = await readIfExists(path.join(baseDir, `${id}.aria.yml`), "utf8");
    const headAria = await readIfExists(path.join(headDir, `${id}.aria.yml`), "utf8");
    const missing = [
        !basePng && "base png",
        !headPng && "head png",
        baseAria === undefined && "base aria",
        headAria === undefined && "head aria",
    ].filter(Boolean);
    const failures = [];
    const accepted = [];
    let ratio;
    let sizeMismatch;

    if (isHeadErrored) {
        failures.push("head capture errored");
    }

    if (missing.length > 0) {
        failures.push(`missing ${missing.join(", ")}`);
    }

    if (basePng && headPng) {
        const result = await comparePixels({ id, basePng, headPng, diffDir });
        ratio = result.ratio;
        sizeMismatch = result.sizeMismatch;

        if (sizeMismatch) {
            (acceptedKinds.has("size") ? accepted : failures).push(`size ${sizeMismatch}`);
        }

        if (ratio > MAX_DIFF_RATIO) {
            (acceptedKinds.has("pixel") ? accepted : failures).push(`pixel ${(ratio * 100).toFixed(3)}%`);
        }
    }

    const isAriaDifferent = baseAria !== undefined && headAria !== undefined && baseAria !== headAria;
    if (isAriaDifferent) {
        (acceptedKinds.has("aria") ? accepted : failures).push("aria");
    }

    return { id, ratio, sizeMismatch, failures, accepted, baseAria, headAria, isAriaDifferent };
};

const escapeHtml = (text) => {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
};

const renderAria = (text, otherText) => {
    const otherLines = new Set(otherText.split("\n"));

    return text
        .split("\n")
        .map((line) => (otherLines.has(line) ? escapeHtml(line) : `<mark>${escapeHtml(line)}</mark>`))
        .join("\n");
};

const renderImage = (filePath, label, visualDir) => {
    const isPresent = existsSync(filePath);
    const src = escapeHtml(path.relative(visualDir, filePath));

    const content = isPresent ? `<img src="${src}" alt="${label}">` : "<p>none</p>";

    return `<figure><figcaption>${label}</figcaption>${content}</figure>`;
};

const renderStorySection = ({ result, baseDir, headDir, diffDir, visualDir }) => {
    const { id, failures, accepted, baseAria, headAria, isAriaDifferent } = result;
    const status = failures.length > 0 ? `FAIL: ${failures.join("; ")}` : `accepted: ${accepted.join("; ")}`;
    const images = [
        renderImage(path.join(baseDir, `${id}.png`), "base", visualDir),
        renderImage(path.join(headDir, `${id}.png`), "head", visualDir),
        renderImage(path.join(diffDir, `${id}.png`), "diff", visualDir),
    ].join("");
    const aria = isAriaDifferent
        ? `<div class="row"><pre>${renderAria(baseAria, headAria)}</pre><pre>${renderAria(headAria, baseAria)}</pre></div>`
        : "";

    return `<section><h2>${escapeHtml(id)}</h2><p>${escapeHtml(status)}</p><div class="row">${images}</div>${aria}</section>`;
};

const writeReport = async ({ results, baseDir, headDir, diffDir, visualDir, reportPath }) => {
    const sections = results
        .map((result) => renderStorySection({ result, baseDir, headDir, diffDir, visualDir }))
        .join("\n");
    const body = sections || "<p>No differences.</p>";
    const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Visual report</title>
<style>
body { font-family: system-ui, sans-serif; margin: 16px; background: #fff; color: #111; }
section { border-top: 1px solid #ccc; padding: 12px 0; }
.row { display: grid; grid-template-columns: repeat(auto-fit, minmax(0, 1fr)); gap: 8px; }
figure { margin: 0; }
img { max-width: 100%; border: 1px solid #ddd; }
pre { overflow: auto; font-size: 12px; background: #f6f6f6; padding: 8px; margin: 0; }
mark { background: #ffd54f; }
</style>
</head>
<body>
<h1>Visual report</h1>
<p>base: ${escapeHtml(baseDir)}<br>head: ${escapeHtml(headDir)}</p>
${body}
</body>
</html>
`;

    await fs.writeFile(reportPath, html);
};

const printTable = (rows) => {
    const header = ["id", "pixel %", "aria", "result"];
    const widths = header.map((title, index) => Math.max(title.length, ...rows.map((row) => row[index].length)));
    const formatRow = (row) => row.map((cell, index) => cell.padEnd(widths[index])).join("  ");

    console.log(formatRow(header));
    console.log(widths.map((width) => "-".repeat(width)).join("  "));
    rows.forEach((row) => console.log(formatRow(row)));
};

export const runCompare = async ({ baseDir, headDir, visualDir = VISUAL_DIR, acceptedPath = ACCEPTED_PATH }) => {
    const accepted = await getAccepted(acceptedPath);
    const baseErrored = await getErroredIds(baseDir);
    const headErrored = new Set(await getErroredIds(headDir));
    const ids = [
        ...new Set([
            ...(await getIds(baseDir, ".png")),
            ...(await getIds(headDir, ".png")),
            ...(await getIds(baseDir, ".aria.yml")),
            ...(await getIds(headDir, ".aria.yml")),
        ]),
    ].sort();

    const diffDir = path.join(visualDir, "diff");
    const reportPath = path.join(visualDir, "report.html");

    await fs.rm(diffDir, { recursive: true, force: true });
    await fs.mkdir(diffDir, { recursive: true });

    const results = [];

    for (const id of ids) {
        const acceptedKinds = new Set(accepted.filter((entry) => entry.id === id).map(({ kind }) => kind));
        const isHeadErrored = headErrored.has(id);
        results.push(await compareStory({ id, baseDir, headDir, diffDir, acceptedKinds, isHeadErrored }));
    }

    const notable = results.filter(({ failures, accepted: diffs }) => failures.length + diffs.length > 0);
    const failing = notable.filter(({ failures }) => failures.length > 0);
    const stale = accepted.filter(({ id, kind }) => {
        const result = results.find((entry) => entry.id === id);
        const isStillDifferent =
            kind === "pixel"
                ? result?.ratio > MAX_DIFF_RATIO
                : kind === "aria"
                  ? result?.isAriaDifferent
                  : kind === "size" && result?.sizeMismatch;

        return !isStillDifferent;
    });

    await writeReport({ results: notable, baseDir, headDir, diffDir, visualDir, reportPath });

    return { ids, results, notable, failing, stale, baseErrored, reportPath };
};

const main = async () => {
    const { baseDir, headDir } = getOptions();
    const { ids, notable, failing, stale, baseErrored, reportPath } = await runCompare({ baseDir, headDir });

    const rows = notable.map(({ id, ratio, failures, isAriaDifferent }) => [
        id,
        ratio === undefined ? "n/a" : (ratio * 100).toFixed(3),
        isAriaDifferent ? "differs" : "same",
        failures.length > 0 ? `FAIL (${failures.join("; ")})` : "accepted",
    ]);

    if (rows.length > 0) {
        printTable(rows);
        console.log("");
    }

    stale.forEach(({ id, kind }) => {
        console.warn(`WARN: visual-accepted.json entry { id: "${id}", kind: "${kind}" } no longer differs`);
    });

    baseErrored.forEach((id) => {
        console.warn(`WARN: ${id} errored in the base capture, so its base screenshot is not a settled story`);
    });

    const summary = `${ids.length} stories, ${failing.length} failing, ${notable.length - failing.length} accepted`;

    if (failing.length > 0) {
        console.error(`${summary}. Report: ${path.relative(process.cwd(), reportPath)}`);
        process.exitCode = 1;
        return;
    }

    console.log(`${summary}. Report: ${path.relative(process.cwd(), reportPath)}`);
};

const isDirectRun = () =>
    process.argv[1] !== undefined && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectRun()) {
    main().catch((error) => {
        console.error(error.message);
        process.exitCode = 1;
    });
}
