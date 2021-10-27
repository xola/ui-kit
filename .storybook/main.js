module.exports = {
    stories: ["../src/**/*.stories.@(ts|tsx|js|jsx|mdx)"],

    addons: [
        "@storybook/addon-postcss",
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "storybook-css-modules-preset",
    ],
};
