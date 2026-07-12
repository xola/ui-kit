module.exports = {
    stories: ["../src/**/*.@(mdx|stories.@(js|jsx))"],

    staticDirs: ["../public"],

    core: {
        disableTelemetry: true
    },

    addons: [
        "@storybook/addon-webpack5-compiler-babel",
        "@storybook/addon-links",
        {
            name: "@storybook/addon-essentials",
            options: {
                backgrounds: false,
            },
        },
        {
            name: "@storybook/addon-styling-webpack",
            options: {
                rules: [
                    {
                        test: /\.module\.css$/,
                        use: [
                            "style-loader",
                            {
                                loader: "css-loader",
                                options: {
                                    importLoaders: 1,
                                    modules: {
                                        auto: true,
                                        namedExport: false,
                                        exportLocalsConvention: "camel-case-only",
                                        localIdentName: "[name]__[local]--[hash:base64:5]",
                                    },
                                },
                            },
                            {
                                loader: "postcss-loader",
                                options: { implementation: require.resolve("postcss") },
                            },
                        ],
                    },
                    {
                        test: /\.css$/,
                        exclude: /\.module\.css$/,
                        use: [
                            "style-loader",
                            { loader: "css-loader", options: { importLoaders: 1 } },
                            {
                                loader: "postcss-loader",
                                options: { implementation: require.resolve("postcss") },
                            },
                        ],
                    },
                ],
            },
        },
    ],

    framework: {
        name: "@storybook/react-webpack5",
        options: {}
    }
};
