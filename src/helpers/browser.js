export const isOSX = typeof window !== "undefined" && window.navigator.userAgent.includes("Macintosh");

export const isIosBrowser = () => {
    if (typeof window === "undefined" || !window.navigator) {
        return false;
    }

    const ua = window.navigator.userAgent;
    const isIosUa = /ipad|iphone/i.test(ua) && /webkit/i.test(ua);
    // iPads on iOS 13+ report a Macintosh user agent.
    const isIPadOS = /macintosh/i.test(ua) && navigator.maxTouchPoints > 1;

    return isIosUa || isIPadOS;
};

/** `:focus-visible` is an invalid selector in Safari before 15.4 and Chrome before 86, which keep opening on any focus. */
export const isFocusVisible = (element) => {
    try {
        return element.matches(":focus-visible");
    } catch {
        return true;
    }
};
