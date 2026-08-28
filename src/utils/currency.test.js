import { describe, expect, test, vi } from "vitest";

describe("currency (SSR)", () => {
    // getDefaultLocale() used to call navigator-dependent getUserLocale() at module load,
    // which crashed importing this file under SSR/Node (no `navigator`). Stub navigator away
    // explicitly instead of asserting it's undefined: Node 21+ ships a global navigator, so the
    // ambient absence this test used to rely on no longer holds.
    test("imports and returns a symbol without a browser navigator", async () => {
        vi.stubGlobal("navigator", undefined);
        const { getSymbol } = await import("./currency");
        expect(typeof getSymbol("USD")).toBe("string");
        vi.unstubAllGlobals();
    });
});
