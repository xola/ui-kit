import { describe, expect, test, vi } from "vitest";

describe("date (SSR)", () => {
    // Node 21+ ships a global navigator, so stub it away to simulate SSR.
    test("imports without a browser navigator", async () => {
        vi.stubGlobal("navigator", undefined);
        const { formatDate } = await import("./date");
        expect(typeof formatDate).toBe("function");
        vi.unstubAllGlobals();
    });
});
