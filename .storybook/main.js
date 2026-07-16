const path = require("path");

module.exports = {
    stories: ["../src/**/*.@(mdx|stories.@(js|jsx))"],
    staticDirs: ["../public"],

    core: {
        disableTelemetry: true
    },

    addons: ["@storybook/addon-links", "@storybook/addon-docs"],

    framework: {
        name: "@storybook/react-vite",
        options: {}
    },

    async viteFinal(config) {
        config.css = { ...config.css, modules: { localsConvention: "camelCaseOnly" } };

        // tailwind.config.js is CommonJS (consumed by Tailwind/PostCSS via require) but
        // Configuration stories import it as a default ESM import. Vite's build-time
        // commonjs plugin only scans node_modules by default, so include the config here.
        config.build = {
            ...config.build,
            commonjsOptions: {
                ...config.build?.commonjsOptions,
                include: [/tailwind\.config\.js$/, /node_modules/],
            },
        };

        // tailwind.config.js references __dirname (Node-only) in its content globs. The
        // webpack builder mocked it for the browser bundle; Vite does not, so shim it to
        // keep the Configuration stories that import the config from throwing at runtime.
        config.define = {
            ...config.define,
            __dirname: JSON.stringify("/"),
        };

        config.resolve = {
            ...config.resolve,
            alias: {
                ...config.resolve?.alias,
                path: path.resolve(__dirname, "node-path-shim.js"),
            },
        };

        return config;
    },

    features: {
        backgrounds: false
    }
};
