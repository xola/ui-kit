import { describe, expect, test, vi } from "vitest";

describe("date (SSR)", () => {
    // Stub navigator away explicitly instead of asserting it's undefined: Node 21+ ships a
    // global navigator, so the ambient absence this test used to rely on no longer holds.
    test("imports without a browser navigator", async () => {
        vi.stubGlobal("navigator", undefined);
        const { formatDate } = await import("./date");
        expect(typeof formatDate).toBe("function");
        vi.unstubAllGlobals();
    });
});
