export const SIDEBAR_WIDTH = { MIN: 64, MAX: 200 };

export const SIDEBAR_VARIANT = { ICONS: "icons", TEXT: "text", ICONS_AND_TEXT: "iconsAndText" };

// The widths at which this library's own icon, label and trailing node stop fitting. Fixed on
// purpose: a consumer that could move them would reintroduce the per-consumer disagreement
// X2-14336 exists to remove.
export const SIDEBAR_VARIANT_WIDTH = { TEXT: 140, ICONS_AND_TEXT: 174 };

export const SIDEBAR_AUTO_COLLAPSE_VIEWPORT = 1024;

const SNAP_TOLERANCE = 24;

export const variantForWidth = (width) => {
    if (width >= SIDEBAR_VARIANT_WIDTH.ICONS_AND_TEXT) {
        return SIDEBAR_VARIANT.ICONS_AND_TEXT;
    }

    if (width >= SIDEBAR_VARIANT_WIDTH.TEXT) {
        return SIDEBAR_VARIANT.TEXT;
    }

    return SIDEBAR_VARIANT.ICONS;
};

export const ceilingForVariant = (variant) => {
    if (variant === SIDEBAR_VARIANT.ICONS) {
        return SIDEBAR_WIDTH.MIN;
    }

    if (variant === SIDEBAR_VARIANT.TEXT) {
        return SIDEBAR_VARIANT_WIDTH.ICONS_AND_TEXT - 1;
    }

    return SIDEBAR_WIDTH.MAX;
};

export const clampWidth = (width, minWidth, maxWidth) => {
    if (width == null) {
        return maxWidth;
    }

    const parsed = Number(width);

    if (!Number.isFinite(parsed)) {
        return maxWidth;
    }

    return Math.min(Math.max(parsed, minWidth), maxWidth);
};

export const snapWidth = (width, minWidth, maxWidth) => {
    const targets = [minWidth, SIDEBAR_VARIANT_WIDTH.TEXT, SIDEBAR_VARIANT_WIDTH.ICONS_AND_TEXT, maxWidth].filter(
        (target) => target >= minWidth && target <= maxWidth,
    );

    const candidates = targets.filter((target) => Math.abs(target - width) <= SNAP_TOLERANCE);
    const nearest =
        candidates.length > 0 ? candidates.sort((a, b) => Math.abs(a - width) - Math.abs(b - width))[0] : width;

    return clampWidth(nearest, minWidth, maxWidth);
};
