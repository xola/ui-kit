import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import pkg from "./package.json";

const dependencies = Object.keys(pkg.dependencies);

export default defineConfig({
    plugins: [
        dts({
            insertTypesEntry: true,
            include: ["src/**/*", "index.js"],
            tsConfigFilePath: "./tsconfig.json",
        }),
    ],
    build: {
        outDir: "build",

        lib: {
            entry: path.resolve(__dirname, "./index.js"),
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
