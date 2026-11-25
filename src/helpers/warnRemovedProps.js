import { isDevelopment } from "./environment";

const warned = new Set();

/**
 * Warn once per component and prop when a consumer still passes a removed prop. React 19 drops `propTypes` checks, so
 * JS consumers would otherwise get no signal. No-op in production (`isDevelopment` reads `process.env.NODE_ENV`, which
 * the consumer's bundler replaces; `import.meta.env` would be frozen at ui-kit's own build).
 *
 * @param {string} component - Component name, e.g. "Tooltip"
 * @param {object} props - Props the component received
 * @param {Record<string, string>} removed - Removed prop name to replacement text, e.g. { visible: "use 'open'" }
 */
export const warnRemovedProps = (component, props, removed) => {
    if (!isDevelopment) {
        return;
    }

    Object.entries(removed).forEach(([prop, replacement]) => {
        const key = `${component}.${prop}`;
        const isRemovedPropUsed = props[prop] !== undefined && !warned.has(key);

        if (isRemovedPropUsed) {
            warned.add(key);
            console.warn(`UI Kit ${component}: '${prop}' was removed in 3.8, ${replacement}`);
        }
    });
};
