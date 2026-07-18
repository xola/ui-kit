import { describe, expect, it } from "vitest";

// These utils previously called getUserLocale() and PhoneNumberUtil.getInstance()
// at module load, which crashed when imported without a browser (SSR/Node). This
// suite runs in the node environment (no `navigator`) and verifies they import
// and execute with the "en-US" fallback instead of throwing.
describe("SSR-safe utils (no navigator)", () => {
    it("runs without a browser navigator", () => {
        expect(typeof navigator).toBe("undefined");
    });

    it("numbers util imports and formats", async () => {
        const { numberFormat, compactNumber } = await import("./numbers");
        expect(numberFormat(1234.5)).toBe("1,234.50");
        expect(typeof compactNumber(1_234_567)).toBe("string");
    });

    it("currency util imports and returns a symbol", async () => {
        const { getSymbol } = await import("./currency");
        expect(typeof getSymbol("USD")).toBe("string");
    });

    it("phone util imports and formats", async () => {
        const { formatPhoneNumber } = await import("./phone");
        expect(formatPhoneNumber("5402322157", "US")).toBe("(540) 232-2157");
    });

    it("date util imports", async () => {
        const { formatDate } = await import("./date");
        expect(typeof formatDate).toBe("function");
    });
});
