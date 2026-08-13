import { describe, expect, test } from "vitest";

describe("date (SSR)", () => {
    test("imports without a browser navigator", async () => {
        expect(typeof navigator).toBe("undefined");
        const { formatDate } = await import("./date");
        expect(typeof formatDate).toBe("function");
    });
});
