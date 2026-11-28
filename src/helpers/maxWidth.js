/** Tippy capped its root at the viewport on top of the layer's own `maxWidth`, so a wide layer never overflowed a phone. */
const VIEWPORT_MAX_WIDTH = "calc(100vw - 10px)";

/** A length or percentage with its unit, or a CSS math or variable function: the values `min()` accepts. */
const MIN_ARGUMENT = /^(?:[+-]?(?:\d+\.?\d*|\.\d+)(?:%|[a-z]+)|(?:calc|min|max|clamp|var)\(.*\))$/i;

/**
 * Max width of a Popover box or Tooltip bubble: the given width, capped at the viewport width less 10px.
 *
 * @param {number|string} maxWidth - Numbers are px. Lengths, percentages and calc(), min(), max(), clamp() and var()
 *                                   are kept as written.
 * @returns {string} A CSS `max-width`. Keywords such as "none" and unitless strings, which are invalid inside `min()`,
 *                   get the viewport cap alone.
 */
export const getMaxWidth = (maxWidth) => {
    const width = typeof maxWidth === "number" ? `${maxWidth}px` : String(maxWidth ?? "").trim();
    const isMinArgument = MIN_ARGUMENT.test(width);

    return isMinArgument ? `min(${width}, ${VIEWPORT_MAX_WIDTH})` : VIEWPORT_MAX_WIDTH;
};
