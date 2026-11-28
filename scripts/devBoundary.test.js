import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const srcDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "src");
const SOURCE_FILE = /\.(?:jsx?|tsx?)$/;
const TEST_FILE = /\.test\./;
const IMPORT_SPECIFIER = /(?:from\s+|import\s*\(\s*|import\s+)["']([^"']+)["']/g;
const DEV_SPECIFIER = /(?:^|\/)dev(?:\/|$)/;

const isOutsideDevBoundary = (relativePath) => {
    const [topFolder] = relativePath.split(path.sep);

    return SOURCE_FILE.test(relativePath) && !TEST_FILE.test(relativePath) && !["dev", "stories"].includes(topFolder);
};

describe("src/dev boundary", () => {
    test("no module outside src/dev and src/stories imports it", () => {
        const importers = readdirSync(srcDir, { recursive: true })
            .filter(isOutsideDevBoundary)
            .filter((relativePath) => {
                const source = readFileSync(path.join(srcDir, relativePath), "utf8");

                return [...source.matchAll(IMPORT_SPECIFIER)].some(([, specifier]) => DEV_SPECIFIER.test(specifier));
            });

        expect(importers).toEqual([]);
    });
});
