import type { StorybookConfig } from "@storybook/react/types";

const config: StorybookConfig = {
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
};

export default config;
