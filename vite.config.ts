import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import pkg from "./package.json";

const dependencies = Object.keys(pkg.dependencies);
const peerDependencies = Object.keys(pkg.peerDependencies || {});

export default defineConfig({
    // Force production mode to ensure JSX uses production runtime (jsx/jsxs, not jsxDEV)
    // This is critical for library builds that run via `prepare` script during npm install
    mode: "production",
    plugins: [
        react(),
        dts({
            insertTypesEntry: true,
            include: ["src/**/*"],
            exclude: [
                "src/**/*.stories.*",
                "src/**/*.test.*",
                "src/stories/**/*",
                "src/icons/**/*", // Icons published separately as @xola/icons
            ],
            // Use tsconfig.build.json for declaration generation
            tsconfigPath: "./tsconfig.build.json",
            // Disable declaration maps to reduce package size
            compilerOptions: {
                declarationMap: false,
            },
        }),
    ],
    build: {
        outDir: "build",

        lib: {
            // Support both .js and .ts during migration
            entry: path.resolve(__dirname, "src/index.js"),
            name: "XolaUIKit",
            formats: ["es"],
            fileName: (format) => `index.${format === "es" ? "js" : format}`,
        },

        rollupOptions: {
            // Make sure none of the dependencies are bundled.
            external: (id) => {
                // Common transitive dependencies that should be externalized
                const transitiveExternals = [
                    "@emotion",
                    "date-fns",
                    "@floating-ui",
                    "stylis",
                    "memoize-one",
                    "hoist-non-react-statics",
                    "@babel/runtime",
                ];

                // Externalize all dependencies and their subpaths
                if (dependencies.some((dep) => id === dep || id.startsWith(`${dep}/`))) {
                    return true;
                }
                // Externalize all peerDependencies and their subpaths
                if (peerDependencies.some((dep) => id === dep || id.startsWith(`${dep}/`))) {
                    return true;
                }
                // Externalize common transitive dependencies
                if (transitiveExternals.some((dep) => id === dep || id.startsWith(`${dep}/`))) {
                    return true;
                }
                // Externalize @xola/icons
                if (id === "@xola/icons" || id.startsWith("@xola/icons/")) {
                    return true;
                }
                // Externalize React internals
                if (id === "react/jsx-runtime" || id === "react/jsx-dev-runtime") {
                    return true;
                }
                return false;
            },
            output: {
                // Preserve module structure for tree-shaking
                preserveModules: true,
                preserveModulesRoot: "src",
                entryFileNames: (chunkInfo) => {
                    // Preserve original file structure
                    return `${chunkInfo.name}.js`;
                },
                // Provide global variables to use in the UMD build for externalized deps
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM",
                    "@headlessui/react": "HeadlessUI",
                    clsx: "clsx",
                    "lodash-es": "lodash",
                    "@tippyjs/react": "Tippy",
                    "tippy.js": "tippy",
                    downshift: "Downshift",
                    "react-hotkeys-hook": "reactHotkeysHook",
                    "get-user-locale": "getUserLocale",
                    "react-textarea-autosize": "TextareaAutosize",
                    "react-select": "ReactSelect",
                    "nouislider-react": "Nouislider",
                    "use-debounce": "useDebounce",
                    axios: "axios",
                    ahooks: "ahooks",
                    dayjs: "dayjs",
                    "react-day-picker": "DayPicker",
                    "libphonenumber-js": "libphonenumber",
                    "react-hot-toast": "toast",
                    "react18-json-view": "ReactJsonView",
                    "tailwind-merge": "tailwindMerge",
                },
            },
        },
    },
});
