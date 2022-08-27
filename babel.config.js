module.exports = {
    presets: [["@babel/preset-env", { targets: { node: "current" } }]],
    plugins: [["@fullstory/babel-plugin-annotate-react"]],
};
