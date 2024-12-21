import path from "path";
import { defineConfig } from "vite";
import pkg from "./package.json";

const dependencies = Object.keys(pkg.dependencies);
const devDependencies = Object.keys(pkg.devDependencies);

export default defineConfig({
    build: {
        outDir: "build",

        lib: {
            entry: path.resolve(__dirname, "src/index.js"),
            name: "XolaUIKit",
            fileName: (format) => `ui-kit.${format}.js`,
            formats: ["es"],
        },

        rollupOptions: {
            // Make sure none of the dependencies are bundled.
            external: [...dependencies, ...devDependencies],
            // Leave commented out - testing multiple outputs
            // input: {
            //     server: "src/utils/index.js",
            //     all: "src/index.js",
            // },
            // output: {
            //     name: "browser",
            //     entryFileNames: `ui-kit.[name].js`,
            //     formats: ["es"]
            // }
        },
    },
    test: {
        globals: true,
    },
});
