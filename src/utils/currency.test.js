import { describe, expect, test, vi } from "vitest";

describe("currency (SSR)", () => {
    // Node 21+ ships a global navigator, so stub it away to simulate SSR.
    test("imports and returns a symbol without a browser navigator", async () => {
        vi.stubGlobal("navigator", undefined);
        const { getSymbol } = await import("./currency");
        expect(typeof getSymbol("USD")).toBe("string");
        vi.unstubAllGlobals();
    });
});
