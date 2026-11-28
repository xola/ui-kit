import { describe, expect, test, vi } from "vitest";

describe("phone (SSR)", () => {
    // Node 21+ ships a global navigator, so stub it away to simulate SSR.
    test("imports and formats without a browser navigator", async () => {
        vi.stubGlobal("navigator", undefined);
        const { formatPhoneNumber } = await import("./phone");
        expect(formatPhoneNumber("5402322157", "US")).toBe("(540) 232-2157");
        vi.unstubAllGlobals();
    });
});
