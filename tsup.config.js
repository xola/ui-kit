import { defineConfig } from "tsup";
import fs from "fs";

export default defineConfig({
    entry: ['src/index.js'],
    splitting: true,
    sourcemap: true,
    clean: true,
    minify: false,
    onSuccess() {
        console.log("\nBuild completed. Copying additional files...");
        fs.copyFileSync("index.d.ts", "dist/index.d.ts");
        fs.copyFileSync("tailwind.config.js", "dist/tailwind.config.js");
        fs.copyFileSync("postcss.config.js", "dist/postcss.config.js");
    },
})
