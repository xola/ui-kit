import path from "path";
import { defineConfig } from "vite";
import pkg from "./package.json";

export default defineConfig({
    build: {
        outDir: "build",

        lib: {
            entry: path.resolve(__dirname, "./index.js"),
            name: "XolaIcons",
            fileName: (format) => `icons.${format}.js`,
            formats: ["es"]
        },
    }
});
