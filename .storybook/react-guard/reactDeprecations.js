/**
 * Console messages from React 18.3 deprecations and React 19 removals. A story that logs one of these works on
 * one React major and breaks or warns on the other.
 */
const REACT_DEPRECATIONS = [
    /Accessing element\.ref was removed/,
    /defaultProps.*(function components|will be removed)/,
    /findDOMNode/,
    /ReactDOM\.render is no longer supported/,
    /string ref/i,
];

const FORMAT_SPECIFIER = /%[sdifoOc]/g;

const isDeprecation = (message) => REACT_DEPRECATIONS.some((pattern) => pattern.test(message));

const isAllowed = (message, allowed) => allowed.some((substring) => message.includes(substring));

/**
 * Joins console arguments into the line the browser would print. React passes component names as `%s` values, so
 * allowlist substrings like "Input: Support for defaultProps" only exist after substitution.
 */
export const formatConsoleArgs = (args) => {
    const [template, ...values] = args;
    if (typeof template !== "string") {
        return args.map(String).join(" ");
    }

    let valueIndex = 0;
    const message = template.replace(FORMAT_SPECIFIER, (specifier) => {
        const hasValue = valueIndex < values.length;
        return hasValue ? String(values[valueIndex++]) : specifier;
    });

    return [message, ...values.slice(valueIndex).map(String)].join(" ");
};

export const findDeprecations = (messages, allowed) => {
    return messages.filter((message) => isDeprecation(message) && !isAllowed(message, allowed));
};
