// .storybook/manager.js

import { addons } from "@storybook/addons";
import { themes } from "@storybook/theming";
import xola from "./xola";

addons.setConfig({
    theme: xola,
});
