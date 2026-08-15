module.exports = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx)"],

    framework: {
        name: "@storybook/react-vite",
        options: {
            builder: {
                viteConfigPath: ".storybook/vite.config.js",
            },
        },
    },

    core: {
        disableTelemetry: true,
    },

    // Resolved relative to this config directory, unlike Storybook 6's root-relative -s flag.
    staticDirs: ["../public"],

    docs: {
        autodocs: "tag",
    },

    addons: [
        "@storybook/addon-links",
        "@storybook/addon-designs",
        {
            name: "@storybook/addon-essentials",
            options: {
                backgrounds: false,
            },
        },
    ],
};
