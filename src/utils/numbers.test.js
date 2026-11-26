import { describe, expect, test, vi } from "vitest";

describe("numbers (SSR)", () => {
    // Node 21+ ships a global navigator, so stub it away to simulate SSR.
    test("imports and formats without a browser navigator", async () => {
        vi.stubGlobal("navigator", undefined);
        const { numberFormat, compactNumber } = await import("./numbers");
        expect(numberFormat(1234.5)).toBe("1,234.50");
        expect(typeof compactNumber(1_234_567)).toBe("string");
        vi.unstubAllGlobals();
    });
});
