import { describe, expect, test } from "vitest";
import { getMaxWidth } from "./maxWidth";

const VIEWPORT = "calc(100vw - 10px)";

describe("getMaxWidth", () => {
    test("caps a number as px at the viewport width", () => {
        expect(getMaxWidth(350)).toBe(`min(350px, ${VIEWPORT})`);
        expect(getMaxWidth(0)).toBe(`min(0px, ${VIEWPORT})`);
        expect(getMaxWidth(12.5)).toBe(`min(12.5px, ${VIEWPORT})`);
    });

    test("caps a length or percentage at the viewport width", () => {
        expect(getMaxWidth("200px")).toBe(`min(200px, ${VIEWPORT})`);
        expect(getMaxWidth("20rem")).toBe(`min(20rem, ${VIEWPORT})`);
        expect(getMaxWidth(".5em")).toBe(`min(.5em, ${VIEWPORT})`);
        expect(getMaxWidth("50%")).toBe(`min(50%, ${VIEWPORT})`);
        expect(getMaxWidth(" 300px ")).toBe(`min(300px, ${VIEWPORT})`);
    });

    test("caps CSS math and variable functions at the viewport width", () => {
        expect(getMaxWidth("calc(200px + 20px)")).toBe(`min(calc(200px + 20px), ${VIEWPORT})`);
        expect(getMaxWidth("var(--w)")).toBe(`min(var(--w), ${VIEWPORT})`);
        expect(getMaxWidth("min(300px, 50vw)")).toBe(`min(min(300px, 50vw), ${VIEWPORT})`);
        expect(getMaxWidth("max(10rem, 20vw)")).toBe(`min(max(10rem, 20vw), ${VIEWPORT})`);
        expect(getMaxWidth("clamp(100px, 50%, 400px)")).toBe(`min(clamp(100px, 50%, 400px), ${VIEWPORT})`);
        expect(getMaxWidth("CALC(1px + 2px)")).toBe(`min(CALC(1px + 2px), ${VIEWPORT})`);
    });

    test("uses the viewport cap alone for values invalid inside min()", () => {
        expect(getMaxWidth("none")).toBe(VIEWPORT);
        expect(getMaxWidth("max-content")).toBe(VIEWPORT);
        expect(getMaxWidth("350")).toBe(VIEWPORT);
        expect(getMaxWidth("")).toBe(VIEWPORT);
        expect(getMaxWidth(null)).toBe(VIEWPORT);
        expect(getMaxWidth(undefined)).toBe(VIEWPORT);
    });
});
