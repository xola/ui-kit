const colors = require("./colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    purge: [
        "./src/**/*.js",
        "./src/**/*.jsx",
        "./node_modules/xola-ui-kit/src/**/*.js",
        "./node_modules/xola-ui-kit/src/**/*.jsx",
    ],

    darkMode: false,

    theme: {
        colors: {
            transparent: "transparent",
            current: "currentColor",
            black: "#222324",
            white: "#ffffff",
            ...colors,
            primary: colors.blue,
            secondary: colors.gray,
            warning: colors.yellow,
            success: colors.green,
            danger: colors.red,
        },

        extend: {
            fontFamily: {
                sans: ["SF Pro Display", ...defaultTheme.fontFamily.sans],
            },
        },
    },

    variants: {
        extend: {
            opacity: ["disabled"],
        },
    },

    plugins: [require("@tailwindcss/forms")],
};
