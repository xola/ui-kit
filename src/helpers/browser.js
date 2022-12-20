/* global navigator */
export const isOSX = typeof window !== "undefined" ? window.navigator.userAgent.includes("Macintosh") : false;
