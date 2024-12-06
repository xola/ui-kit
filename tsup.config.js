import { defineConfig } from "tsup";
import fs from "fs";

export default defineConfig({
    target: "node18",
    entry: ["src/index.js"],
    format: ["cjs", "esm"],
    splitting: true,
    sourcemap: true,
    clean: true,
    minify: false,
    onSuccess() {
        console.log("\n🏁 Build completed. Copying additional files...");
        fs.copyFileSync("index.d.ts", "dist/index.d.ts");
        fs.copyFileSync("index.d.ts", "dist/index.d.mts");
        fs.copyFileSync("tailwind.config.js", "dist/tailwind.config.cjs");
        fs.copyFileSync("postcss.config.js", "dist/postcss.config.cjs");
    },
})
