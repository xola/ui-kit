import path from "path";
import { defineConfig } from "vite";
import pkg from "./package.json" with { type: "json" };

const packages = [...Object.keys(pkg.dependencies), ...Object.keys(pkg.devDependencies)];

// Subpath imports (react-select/creatable, libphonenumber-js/max) don't match the bare package
// name, so an exact-match list silently bundles them and their metadata.
const isExternal = (id) => !id.endsWith(".css") && packages.some((name) => id === name || id.startsWith(`${name}/`));

export default defineConfig({
    // Consumers installing from git build this via `prepare`, where NODE_ENV may not be "production".
    // Vite would then emit jsxDEV calls, which crash against React's production jsx-dev-runtime.
    esbuild: { jsxDev: false },

    build: {
        outDir: "build",

        lib: {
            // `dev/index` keeps the dev-only subpath out of src/index.js; preserveModules still emits one copy of shared modules.
            entry: {
                index: path.resolve(import.meta.dirname, "src/index.js"),
                "dev/index": path.resolve(import.meta.dirname, "src/dev/index.js"),
            },
            formats: ["es"],
            // Vite 6+ names the bundled CSS after package.json "name"; consumers import build/style.css.
            cssFileName: "style",
        },

        rollupOptions: {
            // Make sure none of the dependencies are bundled.
            external: isExternal,

            output: {
                // Mirror src/ in build/ instead of one rolled-up file, so consumer bundlers can
                // tree-shake per-module instead of pulling the whole dependency graph in on any import.
                preserveModules: true,
                preserveModulesRoot: "src",
                entryFileNames: "[name].js",
            },
        },
    },
    test: {
        globals: true,
    },
});
