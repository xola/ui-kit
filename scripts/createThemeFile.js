// The scripts generates a theme file in `src/theme.js` using the configured theme object from TailwindCSS.
const { promises: fs } = require("fs");
const tailwind = require("../tailwind.config");

const theme = JSON.stringify(tailwind.theme, null, 4);

fs.writeFile(
    "src/theme.js",
    `// This file is auto-generated. Do not change it manually!
/* eslint-disable prettier/prettier */
export const theme = ${theme};
/* eslint-enable */
`,
);
