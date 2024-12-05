module.exports = {
    stories: ["../src/**/*.stories.@(js|jsx|mdx)"],
    core: {
        disableTelemetry: true,
        builder: 'webpack5',
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
    ],
};
