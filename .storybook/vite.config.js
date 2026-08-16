import { defineConfig } from "vite";

// The root vite.config.js exists to build the publishable library: it turns on lib mode and marks
// every dependency external. Storybook must not inherit either setting, or the preview ships with
// React unresolved and Storybook's own externals get clobbered. Hence this deliberately empty
// config, wired up via builder.viteConfigPath in main.js.
export default defineConfig({});
