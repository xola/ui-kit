module.exports = {
    stories: ["../src/**/*.stories.@(js|jsx|mdx)"],

    core: {
        disableTelemetry: true,
    },

    addons: [
        "@storybook/addon-postcss",
        "@storybook/addon-links",
        "storybook-css-modules-preset",
        "storybook-addon-designs",
        {
            name: "@storybook/addon-essentials",
            options: {
                backgrounds: false,
            },
        },
        "@storybook/addon-mdx-gfm",
    ],

    framework: {
        name: "@storybook/react-vite",
    },

    docs: {
        autodocs: true,
    },
};
