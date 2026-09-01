import {
    SIDEBAR_VARIANT,
    SIDEBAR_VARIANT_WIDTH,
    SIDEBAR_WIDTH,
    ceilingForVariant,
    clampWidth,
    snapWidth,
    variantForWidth,
} from "./sidebarWidth";

describe("variantForWidth", () => {
    it("returns icons below the text band", () => {
        expect(variantForWidth(64)).toBe(SIDEBAR_VARIANT.ICONS);
        expect(variantForWidth(139)).toBe(SIDEBAR_VARIANT.ICONS);
    });

    it("returns text from 140 up to but not including 174", () => {
        expect(variantForWidth(140)).toBe(SIDEBAR_VARIANT.TEXT);
        expect(variantForWidth(173)).toBe(SIDEBAR_VARIANT.TEXT);
    });

    it("returns iconsAndText at 174 and above", () => {
        expect(variantForWidth(174)).toBe(SIDEBAR_VARIANT.ICONS_AND_TEXT);
        expect(variantForWidth(200)).toBe(SIDEBAR_VARIANT.ICONS_AND_TEXT);
    });
});

describe("ceilingForVariant", () => {
    it("pins icons to the minimum width so the variant can never leave dead space", () => {
        expect(ceilingForVariant(SIDEBAR_VARIANT.ICONS)).toBe(SIDEBAR_WIDTH.MIN);
    });

    it("caps text one pixel below the iconsAndText band", () => {
        expect(ceilingForVariant(SIDEBAR_VARIANT.TEXT)).toBe(SIDEBAR_VARIANT_WIDTH.ICONS_AND_TEXT - 1);
    });

    it("leaves iconsAndText at the maximum", () => {
        expect(ceilingForVariant(SIDEBAR_VARIANT.ICONS_AND_TEXT)).toBe(SIDEBAR_WIDTH.MAX);
    });

    it("falls back to the maximum for an unknown variant", () => {
        expect(ceilingForVariant(undefined)).toBe(SIDEBAR_WIDTH.MAX);
    });
});

describe("clampWidth", () => {
    it("clamps to the given bounds", () => {
        expect(clampWidth(10, 64, 200)).toBe(64);
        expect(clampWidth(500, 64, 200)).toBe(200);
        expect(clampWidth(150, 64, 200)).toBe(150);
    });

    it("returns the maximum when the value is not a finite number", () => {
        expect(clampWidth(Number.NaN, 64, 200)).toBe(200);
        expect(clampWidth(null, 64, 200)).toBe(200);
    });
});

describe("snapWidth", () => {
    it("snaps to a band edge within 24px", () => {
        expect(snapWidth(150, 64, 200)).toBe(SIDEBAR_VARIANT_WIDTH.TEXT);
        expect(snapWidth(180, 64, 200)).toBe(SIDEBAR_VARIANT_WIDTH.ICONS_AND_TEXT);
        expect(snapWidth(70, 64, 200)).toBe(SIDEBAR_WIDTH.MIN);
        expect(snapWidth(190, 64, 200)).toBe(SIDEBAR_WIDTH.MAX);
    });

    it("leaves a width alone when no target is within tolerance", () => {
        expect(snapWidth(110, 64, 200)).toBe(110);
    });

    it("never snaps outside the given bounds", () => {
        expect(snapWidth(150, 64, 139)).toBe(139);
    });
});
