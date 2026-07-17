import xolaLint from "@xola/jslint";

export default [
    {
        ignores: [
            "src/stories/**",
            "src/theme.js",
            "build/**",
            "storybook-static/**",
            "node_modules/**",
            "public/theme.css",
            "**/*.test.{js,jsx,ts,tsx}",
            "**/test/**",
        ],
    },
    ...xolaLint,
];
