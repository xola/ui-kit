import { describe, expect, test } from "vitest";

describe("currency (SSR)", () => {
    // getDefaultLocale() used to call navigator-dependent getUserLocale() at module load,
    // which crashed importing this file under SSR/Node (no `navigator`).
    test("imports and returns a symbol without a browser navigator", async () => {
        expect(typeof navigator).toBe("undefined");
        const { getSymbol } = await import("./currency");
        expect(typeof getSymbol("USD")).toBe("string");
    });
});
