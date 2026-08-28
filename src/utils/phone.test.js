import { describe, expect, test, vi } from "vitest";

describe("phone (SSR)", () => {
    // Previously called PhoneNumberUtil.getInstance() at module load, which crashed
    // importing this file under SSR/Node (no `navigator`). Stub navigator away explicitly
    // instead of asserting it's undefined: Node 21+ ships a global navigator, so the ambient
    // absence this test used to rely on no longer holds.
    test("imports and formats without a browser navigator", async () => {
        vi.stubGlobal("navigator", undefined);
        const { formatPhoneNumber } = await import("./phone");
        expect(formatPhoneNumber("5402322157", "US")).toBe("(540) 232-2157");
        vi.unstubAllGlobals();
    });
});
