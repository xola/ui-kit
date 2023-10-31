/* global navigator */
// eslint-disable-next-line no-undef, no-negated-condition
export const isOSX = typeof window !== "undefined" ? window.navigator.userAgent.includes("Macintosh") : false;
