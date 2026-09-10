// `process` isn't declared in a browser bundle: consumers' bundlers (webpack, Vite) statically
// replace process.env.NODE_ENV at build time. The `typeof` guard keeps a bundler-free ESM
// consumer (SSR, a raw <script type="module">) from throwing on the read.
// eslint-disable-next-line no-undef
export const isDevelopment = typeof process === "undefined" ? false : process.env?.NODE_ENV !== "production";
