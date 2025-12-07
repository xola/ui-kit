export const isOSX = typeof window === "undefined" ? false : window.navigator.userAgent.includes("Macintosh");

export const isIosBrowser = () => {
    if (typeof window === "undefined" || !window.navigator) return false;

    const ua = window.navigator.userAgent;
    const indexOS = !!/ipad/i.test(ua) || !!/iphone/i.test(ua);
    const webkit = !!/webkit/i.test(ua);

    // Additional check for iPad with iOS 13+

    const indexPad = !!/macintosh/i.test(ua) && navigator.maxTouchPoints > 1;

    return (indexOS && webkit) || indexPad;
};
