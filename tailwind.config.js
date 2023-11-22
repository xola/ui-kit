const defaultTheme = require("tailwindcss/defaultTheme");
const path = require("path");

const colors = {
    transparent: "transparent",
    current: "currentColor",
    black: "#222324",
    white: "#ffffff",

    gray: {
        hover: "#F7F9FB",
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

    turquoise: {
        // TODO: We need other shades to match the scheme
        DEFAULT: "#3FE2EE",
    },

    green: {
        lighter: "#E2FFEF",
        lightish: "#C1F9D9",
        light: "#33E781",
        DEFAULT: "#27CE70",
        dark: "#23B965",
        darker: "#168848",
    },

    red: {
        lighter: "#FFF0F0",
        lightish: "#FFE1E1",
        light: "#FFA1A1",
        DEFAULT: "#FF5A5A",
        dark: "#E93737",
        darker: "#CD1F1F",
    },

    yellow: {
        lighter: "#FFFAF0",
        lightish: "#FFECC6",
        light: "#FFDB8E",
        DEFAULT: "#FFC03D",
        dark: "#EBAA24",
        darker: "#987122",
    },

    orange: {
        lighter: "#FFF1E7",
        lightish: "#FFF1E7",
        light: "#FFB493",
        DEFAULT: "#FF9668",
        dark: "#EC743F",
        darker: "#ff7336", // Made up by Rushi till Barth gives us a color
    },
};

const spacing = {
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
    30: "120px",
    32: "128px",
    36: "144px",
    40: "160px",
    44: "176px",
    48: "192px",
    50: "200px",
    52: "208px",
    54: "216px",
    56: "224px",
    60: "240px",
    64: "256px",
    65: "260px", // CODE REVIEW: Should switch to w-64 260px or use Barth's spacing here?
    72: "288px",
    75: "300px",
    80: "320px",
    85: "340px",
    96: "384px",
    100: "400px",
    105: "420px",
    110: "440px",
    125: "500px",
    150: "600px",
    140: "560px",
    200: "800px",
};
module.exports = {
    content: [
        "./src/**/*.js",
        "./src/**/*.jsx",
        "./src/**/*.ts",
        "./src/**/*.tsx",
        path.join(__dirname, "build/ui-kit.es.js"),
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

        spacing,

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
                mono: ["Roboto Mono", ...defaultTheme.fontFamily.mono],
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
                // TODO: Other letter spacings are in EM and need to be converted to px
            },

            minWidth: spacing,
            maxWidth: spacing,
        },
    },

    plugins: [require("@tailwindcss/forms")],
};
