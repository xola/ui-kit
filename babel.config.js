module.exports = {
    presets: [
        ["@babel/preset-env", { targets: { node: "current" } }],
        // Jest transforms .jsx components and Storybook's Vite builder runs this config over the
        // stories. React 17.0.2 ships react/jsx-runtime, so the automatic runtime is safe here and
        // doesn't require React to be in scope.
        ["@babel/preset-react", { runtime: "automatic" }],
    ],
};
