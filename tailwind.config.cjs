const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("./tailwind-config/colors");
const spacing = require("./tailwind-config/spacing");

// console.log("Paths", path.join(__dirname, "build/index.js"), path.join(__dirname, "build/../index.js"));
// process.exit(1);

module.exports = {
    content: [
        "./src/**/*.js",
        "./src/**/*.jsx",
        "./src/**/*.ts",
        "./src/**/*.tsx",
        // The below is required so that the app installing UI Kit will build the tailwind classes
        // path.join("/Users/rushi/Sites/work/xola/x2/ui-kit", "build/*"),
        "node_modules/@xola/ui-kit/build/*",
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
                sans: ["InterVariable", "Inter", ...defaultTheme.fontFamily.sans],
                mono: ["Roboto Mono", ...defaultTheme.fontFamily.mono],
            },

            screens: {
                "3xl": "1836px",
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
