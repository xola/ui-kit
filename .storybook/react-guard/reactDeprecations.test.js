import { findDeprecations, formatConsoleArgs } from "./reactDeprecations.js";

const defaultPropsMsg = "Warning: Input: Support for defaultProps will be removed from function components";

describe("findDeprecations", () => {
    test("flags element.ref access", () => {
        expect(findDeprecations(["Warning: Accessing element.ref was removed in React 19"], [])).toHaveLength(1);
    });

    test("flags function component defaultProps", () => {
        expect(findDeprecations([defaultPropsMsg], [])).toHaveLength(1);
    });

    test("ignores unrelated warnings", () => {
        expect(findDeprecations(["Warning: foo"], [])).toEqual([]);
    });

    test("skips messages containing an allowed substring", () => {
        expect(findDeprecations([defaultPropsMsg], ["Input: Support for defaultProps"])).toEqual([]);
    });
});

describe("formatConsoleArgs", () => {
    test("substitutes format specifiers in order", () => {
        const args = ["Warning: %s: Support for defaultProps will be removed%s", "Input", "\n    at Input"];
        expect(formatConsoleArgs(args)).toBe("Warning: Input: Support for defaultProps will be removed\n    at Input");
    });

    test("appends values left over after substitution", () => {
        expect(formatConsoleArgs(["Warning: %s", "a", "b"])).toBe("Warning: a b");
    });

    test("keeps specifiers that have no value", () => {
        expect(formatConsoleArgs(["Warning: %s"])).toBe("Warning: %s");
    });

    test("stringifies a non-string first argument", () => {
        expect(formatConsoleArgs([new Error("boom"), "extra"])).toBe("Error: boom extra");
    });
});
