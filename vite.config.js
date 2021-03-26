import reactRefresh from "@vitejs/plugin-react-refresh";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
    build: {
        outDir: "build",

        lib: {
            entry: path.resolve(__dirname, "src/index.js"),
            name: "XolaUIKit",
        },

        rollupOptions: {
            external: ["react"],

            output: {
                globals: {
                    react: "React",
                },
            },
        },
    },

    plugins: [reactRefresh()],
});
