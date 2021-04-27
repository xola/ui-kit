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
        dark: "#3467C4",
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
            caution: colors.orange,
        },

        spacing: {
            0: "0px",
            px: "1px",
            0.5: "2px",
            0.75: "3px",
            1: "4px",
            1.5: "6px",
            2: "8px",
            2.5: "10px",
            3: "12px",
            3.5: "14px",
            4: "16px",
            5: "20px",
            6: "24px",
            7: "28px",
            8: "32px",
            9: "36px",
            10: "40px",
            11: "44px",
            12: "48px",
            14: "56px",
            15: "60px",
            16: "64px",
            20: "80px",
            24: "96px",
            28: "112px",
            32: "128px",
            36: "144px",
            40: "160px",
            44: "176px",
            48: "192px",
            52: "208px",
            56: "224px",
            60: "240px",
            64: "256px",
            72: "288px",
            80: "320px",
            82: "350px",
            96: "384px",
        },

        fontSize: {
            xs: "10px",
            sm: "12px", // Figma - Small, H6
            base: "14px", // Figma - Medium, H5
            md: "16px", // Figma - Big, H4
            lg: "18px", // Figma - H3
            xl: "21px", // Figma - H2
            "2xl": "24px", // Figma - H1
            "3xl": "38px", // Figma - H0
            "4xl": "42px",
        },

        extend: {
            fontFamily: {
                sans: ["SF Pro Display", ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [require("@tailwindcss/forms")],
};
