import getUserLocale from "get-user-locale";

let cachedLocale;

/**
 * `get-user-locale` reads `navigator`, which Node lacks, so a call at module load crashes any server-side import.
 * Resolves on first use, memoized, and falls back to "en-US" without a browser.
 *
 * @returns {string} A BCP 47 locale tag, e.g. "en-US".
 */
export const getDefaultLocale = () => {
    if (cachedLocale === undefined) {
        cachedLocale = typeof navigator === "undefined" ? "en-US" : getUserLocale();
    }

    return cachedLocale;
};
