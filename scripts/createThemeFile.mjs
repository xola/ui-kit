// The scripts generate a theme file in `src/theme.js` using the configured theme object from TailwindCSS.
import fs from "fs";
import tailwindConfig from "../tailwind.config.mjs";

const theme = JSON.stringify(tailwindConfig.theme, null, 4);

fs.writeFile(
    "src/theme.js",
    `// This file is auto-generated. Do not change it manually!
/* eslint-disable prettier/prettier */
export const theme = ${theme};
/* eslint-enable */
`,
    (error) => {
        if (error) console.error(error);
    },
);
