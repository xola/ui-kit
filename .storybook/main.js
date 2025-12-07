module.exports = {
    // Story files: .jsx/.tsx for components with JSX, .js/.ts for pure JS/TS
    stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],

    // Framework: Vite-based React for Storybook 8
    framework: {
        name: "@storybook/react-vite",
        options: {},
    },

    core: {
        disableTelemetry: true,
    },

    addons: [
        "@storybook/addon-links",
        // "storybook-addon-designs", // Temporarily disabled - incompatible with Storybook 8
        {
            name: "@storybook/addon-essentials",
            options: {
                backgrounds: false,
            },
        },
    ],

    // TypeScript configuration for Storybook
    typescript: {
        check: false, // We'll use tsc separately for type checking
        reactDocgen: false, // Disabled - causes issues with .jsx files
    },

    // Static files directory
    staticDirs: ["../public"],

    // Vite configuration
    async viteFinal(config) {
        // Vite automatically handles:
        // - Modern JS syntax
        // - JSX in .jsx and .tsx files
        // - PostCSS via postcss.config.mjs
        // - CSS Modules out of the box

        return config;
    },
};
