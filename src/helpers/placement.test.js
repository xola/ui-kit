import { describe, expect, test } from "vitest";
import { toSideAlign } from "./placement";

describe("toSideAlign", () => {
    test.each([
        ["top", { side: "top", align: "center" }],
        ["bottom-start", { side: "bottom", align: "start" }],
        ["left-end", { side: "left", align: "end" }],
        ["right", { side: "right", align: "center" }],
        ["auto", { side: "top", align: "center" }],
        [undefined, { side: "top", align: "center" }],
        ["nonsense", { side: "top", align: "center" }],
        ["top-nonsense", { side: "top", align: "center" }],
    ])("%s", (placement, expected) => {
        expect(toSideAlign(placement)).toEqual(expected);
    });
});
