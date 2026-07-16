// Browser shim for Node's "path", used only by the Storybook Vite build.
// tailwind.config.js calls path.join(__dirname, ...) in its content globs. The
// webpack builder polyfilled "path"; Vite does not. The Configuration stories
// only read twConfig.theme, never the content array, so a minimal join suffices.
export const join = (...segments) => segments.filter(Boolean).join("/").replace(/\/+/g, "/");

export default { join };
