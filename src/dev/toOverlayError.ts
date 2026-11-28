import type { OverlayError } from "../../dev";

const stringifyThrown = (thrown: unknown) => {
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
 */
export const toOverlayError = (thrown: unknown): Pick<OverlayError, "name" | "message" | "stack"> => {
    if (thrown instanceof Error) {
        const { name, message, stack } = thrown;
        return { name, message, stack };
    }

    return { name: "Error", message: stringifyThrown(thrown) };
};
