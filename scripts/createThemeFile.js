// The scripts generates a theme file in `src/theme.js` using the configured theme object from TailwindCSS.
import fs from "fs";
import tailwind from "../tailwind.config.js";

const theme = JSON.stringify(tailwind.theme, null, 4);

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
