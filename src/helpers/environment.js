// `process` isn't declared in a browser bundle: consumers' bundlers (webpack, Vite) statically
// replace process.env.NODE_ENV at build time.
// eslint-disable-next-line no-undef
export const isDevelopment = process.env.NODE_ENV !== "production";
