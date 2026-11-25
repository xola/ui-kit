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
    {
        // Library code reads process.env.NODE_ENV, which the consumer's bundler replaces at build time.
        languageOptions: { globals: { process: "readonly" } },
    },
];
