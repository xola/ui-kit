import { theme } from "../src/theme.js";

export default {
    stories: ["../src/**/*.@(mdx|stories.@(js|jsx))"],
    staticDirs: ["../public"],

    core: {
        disableTelemetry: true
    },

    addons: [
        "@storybook/addon-links",
        "@storybook/addon-docs",
        "@storybook/addon-vitest"
    ],

    framework: {
        name: "@storybook/react-vite",
        options: {}
    },

    async viteFinal(config) {
        config.css = { ...config.css, modules: { localsConvention: "camelCaseOnly" } };

        // The Configuration stories import tailwind.config.js to display theme tokens, but
        // that file pulls in Node-only imports (path, url, @tailwindcss/forms) that can't run
        // in the browser. src/theme.js is the same theme object generated for the browser
        // (npm run prepare, before Storybook starts), so serve that in its place. The stories
        // only read `.theme`.
        config.plugins = [
            ...(config.plugins ?? []),
            {
                name: "xola-tailwind-config-as-data",
                enforce: "pre",
                transform(_code, id) {
                    if (!id.replace(/\\/g, "/").endsWith("/tailwind.config.js")) {
                        return null;
                    }

                    return { code: `export default ${JSON.stringify({ theme })};`, map: null };
                },
            },
        ];

        return config;
    },

    features: {
        backgrounds: false
    }
};
