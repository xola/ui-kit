import {
    SIDEBAR_VARIANT,
    SIDEBAR_VARIANT_WIDTH,
    SIDEBAR_WIDTH,
    ceilingForVariant,
    clampWidth,
    resolveCrossingWidth,
    resolveMountWidth,
    resolveToggleWidth,
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
        expect(clampWidth(undefined, 64, 200)).toBe(200);
    });

    it("returns the maximum for a stored string that is not a number", () => {
        expect(clampWidth("abc", 64, 200)).toBe(200);
        expect(clampWidth("150px", 64, 200)).toBe(200);
        expect(clampWidth("Infinity", 64, 200)).toBe(200);
    });

    it("treats an empty or whitespace-only string as nothing stored, not as zero", () => {
        expect(clampWidth("", 64, 200)).toBe(200);
        expect(clampWidth("   ", 64, 200)).toBe(200);
    });

    it("parses a numeric string and clamps it", () => {
        expect(clampWidth("1e2", 64, 200)).toBe(100);
        expect(clampWidth("0", 64, 200)).toBe(64);
        expect(clampWidth("-5", 64, 200)).toBe(64);
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

    // Equidistant from two band edges. The comparator returns 0, so the result rides on Array
    // sort stability (guaranteed since ES2019) and the target order: narrower edge wins.
    it("breaks an exact tie towards the narrower target", () => {
        expect(snapWidth(157, 64, 200)).toBe(SIDEBAR_VARIANT_WIDTH.TEXT);
        expect(snapWidth(187, 64, 200)).toBe(SIDEBAR_VARIANT_WIDTH.ICONS_AND_TEXT);
    });
});

describe("resolveMountWidth", () => {
    const base = { minWidth: 64, maxWidth: 200, autoCollapseBelow: 1024 };

    it("uses the stored width on a wide viewport", () => {
        expect(resolveMountWidth({ ...base, storedWidth: "150", hasIntent: false, viewportWidth: 1440 })).toBe(150);
    });

    it("collapses on a narrow viewport when the user has never chosen a width", () => {
        expect(resolveMountWidth({ ...base, storedWidth: "200", hasIntent: false, viewportWidth: 900 })).toBe(64);
    });

    it("honours a stored width on a narrow viewport once the user has chosen one", () => {
        expect(resolveMountWidth({ ...base, storedWidth: "200", hasIntent: true, viewportWidth: 900 })).toBe(200);
    });

    it("falls back to the maximum with nothing stored", () => {
        expect(resolveMountWidth({ ...base, storedWidth: null, hasIntent: false, viewportWidth: 1440 })).toBe(200);
    });

    it("never exceeds a lowered ceiling", () => {
        expect(
            resolveMountWidth({ ...base, maxWidth: 64, storedWidth: "200", hasIntent: true, viewportWidth: 1440 }),
        ).toBe(64);
    });

    it("falls back to the maximum when the stored width is garbage", () => {
        expect(resolveMountWidth({ ...base, storedWidth: "abc", hasIntent: false, viewportWidth: 1440 })).toBe(200);
        expect(resolveMountWidth({ ...base, storedWidth: "", hasIntent: false, viewportWidth: 1440 })).toBe(200);
    });

    it("still auto-collapses on a narrow viewport when the stored width is garbage", () => {
        expect(resolveMountWidth({ ...base, storedWidth: "abc", hasIntent: false, viewportWidth: 900 })).toBe(64);
    });

    it("does not auto-collapse when the viewport rule is disabled", () => {
        expect(
            resolveMountWidth({
                ...base,
                autoCollapseBelow: null,
                storedWidth: "200",
                hasIntent: false,
                viewportWidth: 900,
            }),
        ).toBe(200);
    });
});

describe("resolveCrossingWidth", () => {
    const base = { minWidth: 64, maxWidth: 200 };

    it("snapshots the width and collapses when crossing down", () => {
        expect(
            resolveCrossingWidth({
                ...base,
                width: 200,
                lastExpandedWidth: null,
                wasBelow: false,
                isBelow: true,
                hasIntentBelow: false,
            }),
        ).toEqual({ width: 64, lastExpandedWidth: 200 });
    });

    it("restores the snapshot when crossing up", () => {
        expect(
            resolveCrossingWidth({
                ...base,
                width: 64,
                lastExpandedWidth: 150,
                wasBelow: true,
                isBelow: false,
                hasIntentBelow: false,
            }),
        ).toEqual({ width: 150, lastExpandedWidth: 150 });
    });

    it("restores to the maximum when there is no snapshot", () => {
        expect(
            resolveCrossingWidth({
                ...base,
                width: 64,
                lastExpandedWidth: null,
                wasBelow: true,
                isBelow: false,
                hasIntentBelow: false,
            }),
        ).toEqual({ width: 200, lastExpandedWidth: null });
    });

    it("does not discard a choice the user made while already below the threshold", () => {
        expect(
            resolveCrossingWidth({
                ...base,
                width: 200,
                lastExpandedWidth: null,
                wasBelow: false,
                isBelow: true,
                hasIntentBelow: true,
            }),
        ).toEqual({ width: 200, lastExpandedWidth: null });
    });

    it("does nothing when no boundary was crossed", () => {
        expect(
            resolveCrossingWidth({
                ...base,
                width: 150,
                lastExpandedWidth: null,
                wasBelow: false,
                isBelow: false,
                hasIntentBelow: false,
            }),
        ).toEqual({ width: 150, lastExpandedWidth: null });
    });

    it("preserves lastExpandedWidth when crossing down while already collapsed", () => {
        // Step 1: Start wide with no snapshot
        let state = { width: 200, lastExpandedWidth: null };

        // Step 2: User toggles collapse above threshold
        state = resolveToggleWidth({ ...base, ...state });
        expect(state).toEqual({ width: 64, lastExpandedWidth: 200 });

        // Step 3: Viewport crosses below threshold while already at minWidth
        state = resolveCrossingWidth({
            ...base,
            ...state,
            wasBelow: false,
            isBelow: true,
            hasIntentBelow: false,
        });
        expect(state).toEqual({ width: 64, lastExpandedWidth: 200 });

        // Step 4: User toggles expand to restore the remembered width
        state = resolveToggleWidth({ ...base, ...state });
        expect(state).toEqual({ width: 200, lastExpandedWidth: 200 });
    });
});

describe("resolveToggleWidth", () => {
    const base = { minWidth: 64, maxWidth: 200 };

    it("collapses and remembers the width it left", () => {
        expect(resolveToggleWidth({ ...base, width: 150, lastExpandedWidth: null })).toEqual({
            width: 64,
            lastExpandedWidth: 150,
        });
    });

    it("round-trips back to the middle band rather than jumping to the maximum", () => {
        expect(resolveToggleWidth({ ...base, width: 64, lastExpandedWidth: 150 })).toEqual({
            width: 150,
            lastExpandedWidth: 150,
        });
    });

    it("expands to the maximum when nothing was remembered", () => {
        expect(resolveToggleWidth({ ...base, width: 64, lastExpandedWidth: null })).toEqual({
            width: 200,
            lastExpandedWidth: null,
        });
    });
});
