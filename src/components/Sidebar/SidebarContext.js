import { createContext, useContext } from "react";
import { SIDEBAR_VARIANT, SIDEBAR_WIDTH } from "./sidebarWidth";

export const variantContextValue = (variant) => ({
    variant,
    showIcons: variant !== SIDEBAR_VARIANT.TEXT,
    showText: variant !== SIDEBAR_VARIANT.ICONS,
    isCollapsed: variant === SIDEBAR_VARIANT.ICONS,
});

export const SidebarVariantContext = createContext(variantContextValue(SIDEBAR_VARIANT.ICONS_AND_TEXT));

// Split from the variant context on purpose: width changes on every pointermove during a drag,
// the variant only at a band crossing. One context would re-render every link per pixel.
export const SidebarWidthContext = createContext(SIDEBAR_WIDTH.MAX);

export const useSidebar = () => useContext(SidebarVariantContext);

export const useSidebarWidth = () => useContext(SidebarWidthContext);
