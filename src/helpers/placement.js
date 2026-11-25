const SIDES = ["top", "right", "bottom", "left"];
const ALIGNS = ["start", "center", "end"];
const FALLBACK = { side: "top", align: "center" };

/**
 * Map a Tippy-style placement to Radix `side` and `align`.
 * "auto", undefined and anything unrecognized map to top/center: Radix flips on collision, so no value ever warns.
 *
 * @param {string?} placement - e.g. "top", "bottom-start", "left-end", "auto"
 * @returns {{ side: "top"|"right"|"bottom"|"left", align: "start"|"center"|"end" }}
 */
export const toSideAlign = (placement) => {
    const [side, align = "center"] = typeof placement === "string" ? placement.split("-") : [];
    const isValid = SIDES.includes(side) && ALIGNS.includes(align);

    return isValid ? { side, align } : { ...FALLBACK };
};
