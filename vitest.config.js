import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    test: {
        projects: [
            {
                extends: "./vite.config.js",
                test: {
                    name: "unit",
                    globals: true,
                    environment: "node",
                    include: ["src/**/*.test.{js,jsx}"],
                },
            },
            {
                extends: "./vite.config.js",
                plugins: [
                    storybookTest({
                        configDir: path.join(dirname, ".storybook"),
                        storybookScript: "npm run storybook -- --no-open",
                    }),
                ],
                test: {
                    name: "storybook",
                    browser: {
                        enabled: true,
                        provider: "playwright",
                        headless: true,
                        instances: [{ browser: "chromium" }],
                    },
                },
            },
        ],
    },
});
