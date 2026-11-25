import path from "path";
import { defineConfig } from "vite";
import pkg from "./package.json";

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
            entry: path.resolve(__dirname, "src/index.js"),
            formats: ["es"],
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

                // Rollup 3+ defaults to "default", which binds `import x from "cjs-pkg"` to the
                // whole namespace. Packages without __esModule, such as get-user-locale, then
                // blow up at require time in an untransformed CJS consumer.
                interop: "auto",
            },
        },
    },
    test: {
        globals: true,
    },
});
