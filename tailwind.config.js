const defaultTheme = require("tailwindcss/defaultTheme");
const path = require("path");

const colors = {
    transparent: "transparent",
    current: "currentColor",
    black: "#222324",
    white: "#ffffff",

    gray: {
        lighter: "#F0F2F4",
        light: "#E0E3E7",
        DEFAULT: "#BDC0C6",
        dark: "#8A8C91",
        darker: "#505254",
    },

    blue: {
        lighter: "#D1E1FF",
        light: "#2979D0",
        DEFAULT: "#1352C6",
        dark: "#0E44A8",
        darker: "#0E44A8", // TBD
    },

    green: {
        lighter: "#E2FFEF",
        light: "#33E781",
        DEFAULT: "#27CE70",
        dark: "#23B965",
        darker: "#23B965", // TBD
    },

    red: {
        lighter: "#FFEAEA",
        light: "#FFA1A1",
        DEFAULT: "#FF5A5A",
        dark: "#FF5A5A", // TBD
        darker: "#FF5A5A", // TBD
    },

    yellow: {
        lighter: "#FFFAF0",
        light: "#FFDB8E",
        DEFAULT: "#FFC03D",
        dark: "#FFC03D", // TBD
        darker: "#FFC03D", // TBD
    },

    orange: {
        lighter: "#FFF1E7",
        light: "#FFB493",
        DEFAULT: "#FF9668",
        dark: "#FF9668", // TBD
        darker: "#FF9668", // TBD
    },
};

module.exports = {
    mode: "jit",
    darkMode: false,

    purge: [
        "./src/**/*.js",
        "./src/**/*.jsx",
        "./src/**/*.ts",
        "./src/**/*.tsx",
        path.join(__dirname, "build/xola-ui-kit.umd.js"),
    ],

    theme: {
        colors: {
            ...colors,

            // Color aliases.
            primary: colors.blue,
            secondary: colors.gray,
            warning: colors.yellow,
            success: colors.green,
            danger: colors.red,
        },

        extend: {
            fontSize: {
                xs: "0.6525rem",
                sm: "0.765625rem",
                base: "0.875rem",
            },
            fontFamily: {
                sans: ["SF Pro Display", ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [require("@tailwindcss/forms")],
};
