import { describe, expect, test } from "vitest";

describe("numbers (SSR)", () => {
    // getDefaultLocale() used to call navigator-dependent getUserLocale() at module load,
    // which crashed importing this file under SSR/Node (no `navigator`).
    test("imports and formats without a browser navigator", async () => {
        expect(typeof navigator).toBe("undefined");
        const { numberFormat, compactNumber } = await import("./numbers");
        expect(numberFormat(1234.5)).toBe("1,234.50");
        expect(typeof compactNumber(1_234_567)).toBe("string");
    });
});
