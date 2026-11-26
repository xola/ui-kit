import { describe, expect, test } from "vitest";
import { isFocusVisible } from "./browser";

describe("isFocusVisible", () => {
    test("returns the result of matching :focus-visible", () => {
        expect(isFocusVisible({ matches: (selector) => selector === ":focus-visible" })).toBe(true);
        expect(isFocusVisible({ matches: () => false })).toBe(false);
    });

    test("returns true when the browser rejects the selector", () => {
        const matches = () => {
            throw new SyntaxError("':focus-visible' is not a valid selector");
        };

        expect(isFocusVisible({ matches })).toBe(true);
    });
});
