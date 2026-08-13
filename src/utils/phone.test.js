import { describe, expect, test } from "vitest";

describe("phone (SSR)", () => {
    // Previously called PhoneNumberUtil.getInstance() at module load, which crashed
    // importing this file under SSR/Node (no `navigator`).
    test("imports and formats without a browser navigator", async () => {
        expect(typeof navigator).toBe("undefined");
        const { formatPhoneNumber } = await import("./phone");
        expect(formatPhoneNumber("5402322157", "US")).toBe("(540) 232-2157");
    });
});
