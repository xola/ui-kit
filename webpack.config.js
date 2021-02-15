const nodeExternals = require("webpack-node-externals");
const pkg = require("./package.json");
const path = require("path");

module.exports = {
    mode: "production",
    entry: "./src/index.js",

    output: {
        path: path.resolve(__dirname, "lib"),
        filename: "index.js",
        library: pkg.name,
        libraryTarget: "commonjs2",
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-react",
                            "@babel/preset-env",
                            { plugins: ["@babel/plugin-proposal-class-properties"] },
                        ],
                    },
                },
            },

            {
                test: /\.scss$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader", options: { modules: { auto: true } } },
                    { loader: "sass-loader" },
                ],
            },
        ],
    },

    // Any imported package should not be bundled.
    target: "node",
    externals: [nodeExternals()],
};
