import xolaLint from "@xola/jslint";

export default [
    {
        ignores: [
            "src/stories/**",
            "src/icons/**",
            "src/theme.js",
            "storybook-static/**",
            "public/theme.css",
            "**/*.test.{js,jsx,ts,tsx}",
            "**/test/**",
        ],
    },
    ...xolaLint,
];
