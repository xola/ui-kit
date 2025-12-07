import xolaLint from "@xola/jslint";
import progress from "eslint-plugin-progress";

xolaLint[1].settings.progress = {
    skipStats: false,
    skipSlowFiles: true,
    interval: 2500,
};
xolaLint[1].plugins.progress = progress;

xolaLint[0].ignores.push(".next", "src/theme.js", "src/stories/**", "src/icons/**");
export default [...xolaLint];
