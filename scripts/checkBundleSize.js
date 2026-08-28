// Regression guard for tree-shaking: builds a fixture that imports one component from the built
// package (mirroring how a consumer's bundler resolves it), then fails if the gzipped output grows
// past a threshold set well above a real Button import but far below a whole-package import.
import { gzipSync } from "zlib";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import path from "path";
import { fileURLToPath } from "url";
import { build } from "vite";

const MAX_GZIP_BYTES = 80 * 1024;

const repoRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const fixtureDir = mkdtempSync(path.join(tmpdir(), "ui-kit-bundle-size-"));
const outDir = path.join(fixtureDir, "dist");
const entryFile = path.join(fixtureDir, "entry.js");

writeFileSync(entryFile, 'import { Button } from "@xola/ui-kit";\nconsole.log(Button);\n');

try {
    await build({
        root: fixtureDir,
        logLevel: "warn",
        resolve: {
            alias: { "@xola/ui-kit": repoRoot },
        },
        build: {
            outDir,
            emptyOutDir: false,
            minify: true,
            lib: {
                entry: entryFile,
                formats: ["es"],
                fileName: () => "entry.bundled.js",
            },
        },
    });

    const gzipBytes = gzipSync(readFileSync(path.join(outDir, "entry.bundled.js"))).length;
    console.log(`Button-only import: ${gzipBytes} B gzipped (limit ${MAX_GZIP_BYTES} B)`);

    if (gzipBytes > MAX_GZIP_BYTES) {
        console.error(
            `Bundle size regression: importing { Button } from @xola/ui-kit pulled in ${gzipBytes} B gzipped, ` +
                `over the ${MAX_GZIP_BYTES} B limit. This usually means a change broke tree-shaking ` +
                "(sideEffects, preserveModules output, or the externals list in vite.config.js).",
        );
        process.exitCode = 1;
    }
} finally {
    rmSync(fixtureDir, { recursive: true, force: true });
}
