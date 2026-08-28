import { describe, expect, test, vi } from "vitest";

describe("numbers (SSR)", () => {
    // getDefaultLocale() used to call navigator-dependent getUserLocale() at module load,
    // which crashed importing this file under SSR/Node (no `navigator`). Stub navigator away
    // explicitly instead of asserting it's undefined: Node 21+ ships a global navigator, so the
    // ambient absence this test used to rely on no longer holds.
    test("imports and formats without a browser navigator", async () => {
        vi.stubGlobal("navigator", undefined);
        const { numberFormat, compactNumber } = await import("./numbers");
        expect(numberFormat(1234.5)).toBe("1,234.50");
        expect(typeof compactNumber(1_234_567)).toBe("string");
        vi.unstubAllGlobals();
    });
});
