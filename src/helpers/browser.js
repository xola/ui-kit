// eslint-disable-next-line no-undef
export const isOSX = typeof window === "undefined" ? false : window.navigator.userAgent.includes("Macintosh");

export const isIosBrowser = () => {
    if (typeof window === 'undefined' || !window.navigator) return false;
  
    const ua = window.navigator.userAgent;
    const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
    const webkit = !!ua.match(/WebKit/i);
  
    // Additional check for iPad with iOS 13+
    const iPad = !!ua.match(/Macintosh/i) && navigator.maxTouchPoints > 1;
  
    return (iOS && webkit) || iPad;
  };
  