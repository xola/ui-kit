const Color = require("color");

// Design System colors.
const colors = {
    gray: "#505254", // TODO: Check the value.
    blue: "#1352c6",
    green: "#27ce70",
    yellow: "#ffc03d",
    orange: "#ff9668",
    red: "#ff5a5a",
};

const getColor = (value) => {
    const color = new Color(value);

    return {
        lightest: color.lighten(0.75).hex(),
        light: color.lighten(0.25).hex(),
        DEFAULT: color.hex(),
        dark: color.darken(0.25).hex(),
        darkest: color.darken(0.75).hex(),
    };
};

const getColors = () => {
    const output = {};
    for (let name in colors) {
        output[name] = getColor(colors[name]);
    }
    return output;
};

module.exports = getColors();
