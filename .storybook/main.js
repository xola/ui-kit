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

        // The Configuration stories import tailwind.config.js to display theme tokens. It
        // stays CommonJS (it is published and consumed by Tailwind/PostCSS and by apps via
        // require), and it uses Node-only APIs (require, __dirname, path) that don't exist
        // in the browser. Vite also serves root CJS files raw in dev, so a plain
        // `import cfg from ".../tailwind.config"` has no default export. Evaluate it in Node
        // here and hand the stories a plain ESM data object instead — identical in dev and
        // build. Functions (the plugins array) are dropped; the stories only read `.theme`.
        config.plugins = [
            ...(config.plugins ?? []),
            {
                name: "xola-tailwind-config-as-data",
                enforce: "pre",
                transform(_code, id) {
                    if (!id.replace(/\\/g, "/").endsWith("/tailwind.config.js")) {
                        return null;
                    }

                    delete require.cache[require.resolve(id)];
                    const config = require(id);
                    const json = JSON.stringify(config, (_key, value) =>
                        typeof value === "function" ? undefined : value
                    );

                    return { code: `export default ${json};`, map: null };
                },
            },
        ];

        return config;
    },

    features: {
        backgrounds: false
    }
};
