import { defineConfig } from "tsup";
import fs from "fs";

export default defineConfig({
    target: "node20",
    entry: ["src/index.js"],
    format: ["cjs", "esm"],
    splitting: true,
    sourcemap: false,
    clean: true,
    minify: false,
    loader: {
        ".css": "local-css",
    },
    onSuccess() {
        console.log("\n🏁 Build completed. Copying additional files...");
        fs.copyFileSync("index.d.ts", "dist/index.d.ts");
        fs.copyFileSync("index.d.ts", "dist/index.d.mts");
        fs.copyFileSync("index.css", "dist/ui-kit.css");
    },
});
