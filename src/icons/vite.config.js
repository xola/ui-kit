import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import pkg from "./package.json";

// External dependencies that should not be bundled
const external = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
];

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
            external,
            output: {
                globals: {
                    react: "React",
                    clsx: "clsx",
                    "tailwind-merge": "tailwindMerge",
                },
            },
        },
    },
});
