const stringifyThrown = (thrown) => {
    if (typeof thrown === "string") {
        return thrown;
    }

    try {
        return JSON.stringify(thrown) ?? String(thrown);
    } catch {
        return String(thrown);
    }
};

/**
 * Normalizes anything a `throw` or a rejected promise can carry into `{ name, message, stack? }`.
 * @param {unknown} thrown
 * @returns {{ name: string, message: string, stack?: string }}
 */
export const toOverlayError = (thrown) => {
    if (thrown instanceof Error) {
        const { name, message, stack } = thrown;
        return { name, message, stack };
    }

    return { name: "Error", message: stringifyThrown(thrown) };
};
