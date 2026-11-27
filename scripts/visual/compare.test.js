import { existsSync } from "node:fs";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { PNG } from "pngjs";
import { runCompare } from "./compare.js";

const WIDTH = 10;
const HEIGHT = 10;
const FLAT = [240, 240, 240];
const RED = [255, 0, 0];
const ARIA_SAVE = '- button "Save"';
const ARIA_CANCEL = '- button "Cancel"';

const makePng = ({ width = WIDTH, height = HEIGHT, paint } = {}) => {
    const png = new PNG({ width, height });

    for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
            const [r, g, b] = paint?.(x, y) ?? FLAT;
            const index = (width * y + x) << 2;
            png.data[index] = r;
            png.data[index + 1] = g;
            png.data[index + 2] = b;
            png.data[index + 3] = 255;
        }
    }

    return PNG.sync.write(png);
};

const identicalPng = makePng();
const changedPng = makePng({ paint: (x, y) => (x < 5 && y < 5 ? RED : FLAT) });
const tallerPng = makePng({ height: HEIGHT + 1 });

const writeStory = async (dir, id, { png, aria }) => {
    if (png !== undefined) {
        await writeFile(path.join(dir, `${id}.png`), png);
    }

    if (aria !== undefined) {
        await writeFile(path.join(dir, `${id}.aria.yml`), `${aria}\n`);
    }
};

const writeManifest = async (dir, ids, erroredIds = []) => {
    const manifest = Object.fromEntries(
        [...ids]
            .sort()
            .map((id) => [
                id,
                erroredIds.includes(id) ? { status: "error", error: "storyThrewException: boom" } : { status: "ok" },
            ]),
    );

    await writeFile(path.join(dir, "manifest.json"), `${JSON.stringify(manifest, null, 4)}\n`);
};

let root;
let baseDir;
let headDir;
let visualDir;
let acceptedPath;
let plainRun;
let acceptedRun;

const getResult = (run, id) => run.results.find((result) => result.id === id);

beforeAll(async () => {
    root = await mkdtemp(path.join(tmpdir(), "ui-kit-visual-"));
    baseDir = path.join(root, "base");
    headDir = path.join(root, "head");
    visualDir = path.join(root, "visual");
    acceptedPath = path.join(root, "visual-accepted.json");
    await Promise.all([baseDir, headDir, visualDir].map((dir) => mkdir(dir, { recursive: true })));

    await writeStory(baseDir, "identical", { png: identicalPng, aria: ARIA_SAVE });
    await writeStory(headDir, "identical", { png: identicalPng, aria: ARIA_SAVE });

    await writeStory(baseDir, "pixel-change", { png: identicalPng, aria: ARIA_SAVE });
    await writeStory(headDir, "pixel-change", { png: changedPng, aria: ARIA_SAVE });

    await writeStory(baseDir, "size-mismatch", { png: identicalPng, aria: ARIA_SAVE });
    await writeStory(headDir, "size-mismatch", { png: tallerPng, aria: ARIA_SAVE });

    await writeStory(baseDir, "aria-change", { png: identicalPng, aria: ARIA_SAVE });
    await writeStory(headDir, "aria-change", { png: identicalPng, aria: ARIA_CANCEL });

    await writeStory(baseDir, "missing-head", { png: identicalPng, aria: ARIA_SAVE });

    await writeStory(baseDir, "errored", { png: identicalPng, aria: ARIA_SAVE });
    await writeStory(headDir, "errored", { png: identicalPng, aria: ARIA_SAVE });

    await writeManifest(baseDir, [
        "identical",
        "pixel-change",
        "size-mismatch",
        "aria-change",
        "missing-head",
        "errored",
    ]);
    await writeManifest(headDir, ["identical", "pixel-change", "size-mismatch", "aria-change", "errored"], ["errored"]);

    await writeFile(acceptedPath, "[]\n");
    plainRun = await runCompare({ baseDir, headDir, visualDir, acceptedPath });

    await writeFile(
        acceptedPath,
        `${JSON.stringify(
            [
                { id: "pixel-change", kind: "pixel" },
                { id: "size-mismatch", kind: "size" },
                { id: "aria-change", kind: "aria" },
                { id: "identical", kind: "pixel" },
            ],
            null,
            4,
        )}\n`,
    );
    acceptedRun = await runCompare({ baseDir, headDir, visualDir, acceptedPath });
});

afterAll(async () => {
    await rm(root, { recursive: true, force: true });
});

describe("visual compare harness", () => {
    test("accepts identical fixtures", () => {
        const result = getResult(plainRun, "identical");

        expect(result.failures).toEqual([]);
        expect(result.accepted).toEqual([]);
        expect(result.isAriaDifferent).toBe(false);
        expect(plainRun.notable.map(({ id }) => id)).not.toContain("identical");
    });

    test("reports a changed pixel region as a pixel failure and writes a diff image", () => {
        const result = getResult(plainRun, "pixel-change");

        expect(result.failures).toEqual(["pixel 25.000%"]);
        expect(result.ratio).toBe(0.25);
        expect(existsSync(path.join(visualDir, "diff", "pixel-change.png"))).toBe(true);
    });

    test("reports a dimension mismatch as a size failure without a diff image", () => {
        const result = getResult(plainRun, "size-mismatch");

        expect(result.failures).toEqual(["size 10x10 vs 10x11"]);
        expect(result.ratio).toBeUndefined();
        expect(existsSync(path.join(visualDir, "diff", "size-mismatch.png"))).toBe(false);
    });

    test("reports an aria change", () => {
        const result = getResult(plainRun, "aria-change");

        expect(result.failures).toEqual(["aria"]);
        expect(result.isAriaDifferent).toBe(true);
    });

    test("reports a missing head story", () => {
        const result = getResult(plainRun, "missing-head");

        expect(result.failures).toEqual(["missing head png, head aria"]);
    });

    test("fails a head capture whose manifest contains an error", () => {
        const result = getResult(plainRun, "errored");

        expect(result.failures).toEqual(["head capture errored"]);
        expect(plainRun.failing.map(({ id }) => id)).toContain("errored");
    });

    test("fails every failure class and writes the report", () => {
        expect(plainRun.failing.map(({ id }) => id)).toEqual([
            "aria-change",
            "errored",
            "missing-head",
            "pixel-change",
            "size-mismatch",
        ]);
        expect(existsSync(path.join(visualDir, "report.html"))).toBe(true);
    });

    test("reads visual-accepted.json: accepted differences stop failing and settled entries go stale", () => {
        expect(getResult(acceptedRun, "pixel-change").failures).toEqual([]);
        expect(getResult(acceptedRun, "pixel-change").accepted).toEqual(["pixel 25.000%"]);
        expect(getResult(acceptedRun, "aria-change").failures).toEqual([]);
        expect(getResult(acceptedRun, "aria-change").accepted).toEqual(["aria"]);
        expect(getResult(acceptedRun, "size-mismatch").failures).toEqual([]);
        expect(getResult(acceptedRun, "size-mismatch").accepted).toEqual(["size 10x10 vs 10x11"]);
        expect(acceptedRun.failing.map(({ id }) => id)).toEqual(["errored", "missing-head"]);
        expect(acceptedRun.stale).toEqual([{ id: "identical", kind: "pixel" }]);
    });
});
