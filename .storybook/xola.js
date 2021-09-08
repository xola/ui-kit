// .storybook/YourTheme.js

import { create } from "@storybook/theming";

export default create({
    base: "light",

    colorPrimary: "#1352C6",
    colorSecondary: "#1EA7FD",

    // UI
    appBg: "#F6F9FC",
    appContentBg: "#FFFFFF",
    appBorderColor: "rgba(0,0,0,.1)",
    appBorderRadius: 4,

    // Typography
    fontBase: "Inter, system-ui -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'",
    fontCode: "monospace",

    // Text colors
    textColor: "#222324",
    textInverseColor: "#FFFFFF",

    // Toolbar default and active colors
    barTextColor: "#999999",
    barSelectedColor: "#1EA7FD",
    barBg: "#FFFFFF",

    // Form colors
    inputBg: "#FFFFFF",
    inputBorder: "rgba(0,0,0,.1)",
    inputTextColor: "#999999",
    inputBorderRadius: 4,

    brandTitle: "Xola's UI Components",
    brandImage: "https://xola.com/images/xola-logo-header.png",
});
