import { describe, expect, test } from "vitest";
import { toSideAlign, toSideOffset } from "./placement";

const TOP_CENTER = { side: "top", align: "center" };

describe("toSideAlign", () => {
    test.each([
        ["top", TOP_CENTER],
        ["bottom-start", { side: "bottom", align: "start" }],
        ["left-end", { side: "left", align: "end" }],
        ["right", { side: "right", align: "center" }],
        ["auto", TOP_CENTER],
        [undefined, TOP_CENTER],
        ["nonsense", TOP_CENTER],
        ["top-nonsense", TOP_CENTER],
    ])("%s", (placement, expected) => {
        expect(toSideAlign(placement)).toEqual(expected);
    });
});

describe("toSideOffset", () => {
    test.each([
        [10, 2],
        [8, 0],
        [0, -8],
    ])("distance %s", (distance, expected) => {
        expect(toSideOffset(distance)).toBe(expected);
    });
});
