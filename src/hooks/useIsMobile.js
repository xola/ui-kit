import { useResponsive } from "ahooks";

/**
 * True when the viewport is below the `md` breakpoint (< 768px) — i.e. mobile web. Mirrors the
 * Tailwind `md` breakpoint so JS mobile checks stay in sync with responsive CSS, and reacts to
 * resize / orientation change (unlike a one-off `window.matchMedia` read).
 */
export const useIsMobile = () => {
    const responsive = useResponsive();
    return !responsive?.md;
};
