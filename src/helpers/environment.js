// Consumers' bundlers (webpack, Vite) statically replace the literal `process.env.NODE_ENV` at build
// time but leave `process` itself undeclared, so a `typeof process` guard would wrongly disable
// dev-only warnings in the browser. A bundler-free consumer (a raw <script type="module">) throws a
// ReferenceError on the read, which counts as development. SSR/Node reads the real value.
const getIsDevelopment = () => {
    try {
        return process.env.NODE_ENV !== "production";
    } catch {
        return true;
    }
};

export const isDevelopment = getIsDevelopment();
