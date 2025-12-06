export const isOSX: boolean = typeof window === "undefined" ? false : window.navigator.userAgent.includes("Macintosh");

export const isIosBrowser = (): boolean => {
    if (typeof window === "undefined" || !window.navigator) {
        return false;
    }

    const ua = window.navigator.userAgent;
    const indexOS = !!/ipad/i.test(ua) || !!/iphone/i.test(ua);
    const webkit = !!/webkit/i.test(ua);

    const indexPad = !!/macintosh/i.test(ua) && navigator.maxTouchPoints > 1;

    return (indexOS && webkit) || indexPad;
};
