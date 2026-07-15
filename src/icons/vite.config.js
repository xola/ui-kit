import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import pkg from "./package.json";

const dependencies = Object.keys(pkg.dependencies);
const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    build: {
        outDir: "build",

        lib: {
            entry: path.resolve(dirname, "./index.js"),
            name: "XolaIcons",
            fileName: (format) => `icons.${format}.js`,
            formats: ["es"],
        },

        rollupOptions: {
            // Make sure none of the dependencies are bundled.
            external: dependencies,
        },
    },
});
