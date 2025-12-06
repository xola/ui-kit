module.exports = {
    // Support both .js/.jsx and .ts/.tsx story files during migration
    stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
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
    // TypeScript configuration for Storybook
    typescript: {
        check: false, // We'll use tsc separately for type checking
        reactDocgen: "react-docgen-typescript",
        reactDocgenTypescriptOptions: {
            shouldExtractLiteralValuesFromEnum: true,
            propFilter: (prop) => {
                // Filter out props from node_modules
                if (prop.parent) {
                    return !prop.parent.fileName.includes("node_modules");
                }
                return true;
            },
        },
    },
    webpackFinal: async (config) => {
        // Transpile @tanstack packages that use modern JS syntax
        config.module.rules.push({
            test: /\.m?js$/,
            include: /node_modules\/@tanstack/,
            use: {
                loader: require.resolve("babel-loader"),
                options: {
                    presets: [
                        [
                            require.resolve("@babel/preset-env"),
                            {
                                targets: {
                                    browsers: ["last 2 versions"],
                                },
                            },
                        ],
                    ],
                },
            },
        });
        return config;
    },
};
