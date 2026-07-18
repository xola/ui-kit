import path from "path";
import { defineConfig } from "vite";
import pkg from "./package.json";

// We import NAMED exports from these two CommonJS-only deps (`{ DateUtils }` from react-day-picker,
// `{ PhoneNumberUtil, PhoneNumberFormat }` from google-libphonenumber). Node's ESM loader can't detect
// named exports of a CJS module via cjs-module-lexer, so if left external the built ui-kit throws
// "Named export 'X' not found" under a Node ESM/SSR context. Bundling just these two lets Rollup do the
// CJS->ESM interop. Every other dep is either ESM or imported as default (which Node resolves fine), so
// they stay external to keep the bundle lean and avoid duplicating deps the consuming app already has.
const bundleForEsmInterop = ["react-day-picker", "google-libphonenumber"];

const dependencies = Object.keys(pkg.dependencies).filter((dep) => !bundleForEsmInterop.includes(dep));
const devDependencies = Object.keys(pkg.devDependencies);

export default defineConfig({
    build: {
        outDir: "build",

        lib: {
            entry: path.resolve(__dirname, "src/index.js"),
            name: "XolaUIKit",
            fileName: (format) => `ui-kit.${format}.js`,
            formats: ["es"]
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
