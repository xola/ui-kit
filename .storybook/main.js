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
    ],
    webpackFinal: (config) => {
        // babel-loader's disk cache hashes filenames with crypto.createHash("md4"), which
        // OpenSSL 3 (Node 17+) doesn't support. Disabling the cache skips that call entirely,
        // so this works on any Node version without needing --openssl-legacy-provider.
        config.module.rules.forEach((rule) => {
            (rule.use || []).forEach((use) => {
                if (use.loader && use.loader.includes("babel-loader")) {
                    use.options.cacheDirectory = false;
                }
            });
        });

        return config;
    },
};
