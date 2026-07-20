import getUserLocale from "get-user-locale";

let cachedLocale;

/**
 * Resolve the user's locale lazily and SSR-safely.
 *
 * `get-user-locale` reads `navigator`, which does not exist in Node. Calling it
 * at module load (the previous `const userLocale = getUserLocale()`) crashed any
 * server-side import of these utils. Resolve on first use instead, fall back to
 * "en-US" when there is no browser, and memoize the result.
 *
 * @returns {string} A BCP 47 locale tag, e.g. "en-US".
 */
export const getDefaultLocale = () => {
    if (cachedLocale === undefined) {
        cachedLocale = typeof navigator === "undefined" ? "en-US" : getUserLocale();
    }

    return cachedLocale;
};
