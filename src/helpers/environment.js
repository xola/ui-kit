/**
 * Consumers' bundlers (webpack, Vite) replace the literal `process.env.NODE_ENV` but leave `process` undeclared, so a
 * `typeof process` guard would disable dev-only warnings in the browser. A bundler-free consumer throws a
 * ReferenceError on the read, which counts as development.
 */
const getIsDevelopment = () => {
    try {
        return process.env.NODE_ENV !== "production";
    } catch {
        return true;
    }
};

export const isDevelopment = getIsDevelopment();
