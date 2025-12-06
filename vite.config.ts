import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import pkg from "./package.json";

const dependencies = Object.keys(pkg.dependencies);
const devDependencies = Object.keys(pkg.devDependencies);

export default defineConfig({
    plugins: [
        react(),
        dts({
            insertTypesEntry: true,
            include: ["src/**/*"],
            exclude: [
                "src/**/*.stories.*",
                "src/**/*.test.*",
                "src/stories/**/*",
            ],
            // Use tsconfig.build.json for declaration generation
            tsConfigFilePath: "./tsconfig.build.json",
        }),
    ],
    build: {
        outDir: "build",

        lib: {
            // Support both .js and .ts during migration
            entry: path.resolve(__dirname, "src/index.js"),
            name: "XolaUIKit",
            formats: ["es", "umd"],
        },

        rollupOptions: {
            // Make sure none of the dependencies are bundled.
            external: [...dependencies, ...devDependencies],
            output: {
                // Provide global variables to use in the UMD build for externalized deps
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM",
                },
            },
        },
    },
});
