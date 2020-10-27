module.exports = {
    stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
    addons: ["@storybook/addon-links", "@storybook/addon-essentials"],

    async webpackFinal(config) {
        config.module.rules.push({
            test: /\.scss$/,
            use: [
                { loader: "style-loader" },
                { loader: "css-loader", options: { modules: { auto: true } } },
                { loader: "sass-loader" },
            ],
        });

        return config;
    },
};
