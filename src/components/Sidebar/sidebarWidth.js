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

    // localStorage hands back strings, and `Number("")` is 0, not NaN. Unguarded, an empty stored
    // value would clamp to minWidth and mount the sidebar collapsed.
    if (typeof width === "string" && width.trim() === "") {
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

export const resolveMountWidth = ({ storedWidth, hasIntent, viewportWidth, minWidth, maxWidth, autoCollapseBelow }) => {
    const width = clampWidth(storedWidth, minWidth, maxWidth);
    const shouldAutoCollapse = autoCollapseBelow != null && viewportWidth < autoCollapseBelow && !hasIntent;

    return shouldAutoCollapse ? minWidth : width;
};

// Shared by the crossing-up and toggle-restore branches below: both need to fall back to the
// ceiling when there is no remembered expanded width to return to.
const restoreExpandedWidth = (lastExpandedWidth, minWidth, maxWidth) =>
    clampWidth(lastExpandedWidth ?? maxWidth, minWidth, maxWidth);

export const resolveCrossingWidth = ({
    width,
    lastExpandedWidth,
    wasBelow,
    isBelow,
    hasIntentBelow,
    minWidth,
    maxWidth,
}) => {
    // Crossing down while the user has already chosen a width at this size would throw that
    // choice away with no way back except re-dragging. Only snapshot if currently expanded.
    if (isBelow && !wasBelow && !hasIntentBelow) {
        return { width: minWidth, lastExpandedWidth: width > minWidth ? width : lastExpandedWidth };
    }

    if (!isBelow && wasBelow) {
        return {
            width: restoreExpandedWidth(lastExpandedWidth, minWidth, maxWidth),
            lastExpandedWidth,
        };
    }

    return { width, lastExpandedWidth };
};

export const resolveToggleWidth = ({ width, lastExpandedWidth, minWidth, maxWidth }) => {
    if (width > minWidth) {
        return { width: minWidth, lastExpandedWidth: width };
    }

    return {
        width: restoreExpandedWidth(lastExpandedWidth, minWidth, maxWidth),
        lastExpandedWidth,
    };
};
