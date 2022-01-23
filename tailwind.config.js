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
        darker: "#0E44A8",
    },

    green: {
        lighter: "#E2FFEF",
        light: "#33E781",
        DEFAULT: "#27CE70",
        dark: "#23B965",
        darker: "#1B8E4E", // Made up by Rushi till Barth gives us a color
    },

    red: {
        lighter: "#FFEAEA",
        light: "#FFA1A1",
        DEFAULT: "#FF5A5A",
        dark: "#E93737",
        darker: "#E51919", // Made up by Rushi till Barth gives us a color
    },

    yellow: {
        lighter: "#FFFAF0",
        light: "#FFDB8E",
        DEFAULT: "#FFC03D",
        dark: "#EBAA24",
        darker: "#F0A200", // Made up by Rushi till Barth gives us a color
    },

    orange: {
        lighter: "#FFF1E7",
        light: "#FFB493",
        DEFAULT: "#FF9668",
        dark: "#EC743F",
        darker: "#ff7336", // Made up by Rushi till Barth gives us a color
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
        path.join(__dirname, "build/ui-kit.umd.js"),
    ],

    theme: {
        // Figma: https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%F0%9F%9B%A0-Xola-DS-Desktop-Master-%F0%9F%9B%A0?node-id=1885%3A51992
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
            0.25: "1px",
            0.5: "2px",
            0.75: "3px",
            1: "4px",
            1.5: "6px",
            2: "8px",
            2.5: "10px",
            3: "12px",
            3.5: "14px",
            4: "16px",
            4.5: "18px",
            5: "20px",
            6: "24px",
            7: "28px",
            7.5: "30px",
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
            25: "100px",
            28: "112px",
            32: "128px",
            36: "144px",
            40: "160px",
            44: "176px",
            48: "192px",
            50: "200px",
            52: "208px",
            56: "224px",
            60: "240px",
            64: "256px",
            72: "288px",
            75: "300px",
            80: "320px",
            82: "350px",
            96: "384px",
        },

        // Figma: https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%F0%9F%9B%A0-Xola-DS-Desktop-Master-%F0%9F%9B%A0?node-id=1885%3A51905
        fontSize: {
            xs: "10px",
            sm: "12px", // Figma - Small, H6
            base: "14px", // Figma - Medium, H5
            md: "16px", // Figma - Big, H4
            lg: "18px", // Figma - H3
            xl: "21px", // Figma - H2
            "2xl": "24px", // Figma - H1
            "3xl": "38px", // Figma - H0
        },

        borderRadius: {
            none: "0px",
            DEFAULT: "4px",
            sm: "2px",
            md: "6px",
            lg: "8px",
            xl: "12px",
            "2xl": "16px",
            full: "9999px",
        },

        // Figma: https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%F0%9F%9B%A0-Xola-DS-Desktop-Master-%F0%9F%9B%A0?node-id=1885%3A51905
        extend: {
            fontFamily: {
                sans: ["Inter", ...defaultTheme.fontFamily.sans],
                mono: ["Roboto Mono", ...defaultTheme.fontFamily.mono]
            },

            // P1 - Big 16px 130%
            // P2 - Med 14px 130%
            // P3 - Small 12px 110%
            lineHeight: {
                0: "0px",
                0.25: "1px",
                0.5: "2px",
                0.75: "3px",
                1: "4px",
                1.5: "6px",
                2: "8px",
                2.5: "10px",
                xs: "10px",
                3: "12px",
                sm: "12px",
                3.5: "14px",
                base: "14px",
                4: "16px",
                md: "16px",
                4.5: "18px",
                lg: "18px",
                5: "20px",
                6: "24px",
                7: "28px",
                8: "32px",
                9: "36px",
                10: "40px",
                11: "44px",
                12: "48px",
                p1: "130%",
                p2: "130%",
                p3: "110%",
                p4: "100%",
            },

            letterSpacing: {
                tightest: "-.4px",
                // TODO: Other letter spacings are in EM and need to be coverted to px
            },
        },
    },

    plugins: [require("@tailwindcss/forms"), require("@tailwindcss/line-clamp")],
};
