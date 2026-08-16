import path from "path";
import { defineConfig } from "vite";
import pkg from "./package.json";

const packages = [...Object.keys(pkg.dependencies), ...Object.keys(pkg.devDependencies)];

// Subpath imports (react-select/creatable, libphonenumber-js/max) don't match the bare package
// name, so an exact-match list silently bundles them and their metadata
// Third-party stylesheets stay bundled into index.css, or consumers lose tippy and day-picker styles
const isExternal = (id) => !id.endsWith(".css") && packages.some((name) => id === name || id.startsWith(`${name}/`));

export default defineConfig({
    build: {
        outDir: "build",

        lib: {
            entry: path.resolve(__dirname, "src/index.js"),
            name: "XolaUIKit",
        },

        rollupOptions: {
            // Make sure none of the dependencies are bundled.
            external: isExternal,

            output: {
                // Rollup 3 defaults to "default", which binds `import x from "cjs-pkg"` to the
                // whole namespace. Packages without __esModule (get-user-locale, tippy.js) then
                // blow up at require time in seller's untransformed jest.
                interop: "auto",
            },
        },
    },
});
