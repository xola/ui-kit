module.exports = {
    stories: ["../src/**/*.@(mdx|stories.@(js|jsx))"],

    staticDirs: ["../public"],

    core: {
        disableTelemetry: true
    },

    addons: [
        "@storybook/addon-webpack5-compiler-babel",
        "@storybook/addon-postcss",
        "@storybook/addon-links",
        "storybook-css-modules-preset",
        {
            name: "@storybook/addon-essentials",
            options: {
                backgrounds: false,
            },
        },
    ],

    framework: {
        name: "@storybook/react-webpack5",
        options: {}
    }
};
