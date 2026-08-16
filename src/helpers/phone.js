import { parsePhoneNumberFromString } from "libphonenumber-js/max";

const parse = (number, countryCode) => {
    try {
        // extract: false — by default libphonenumber-js pulls a phone number *out* of surrounding
        // text, so "guest-4624081633870@email.com" formats down to just the digits. Callers pass
        // arbitrary strings here and expect them back untouched when they aren't a phone number.
        return parsePhoneNumberFromString(number, { defaultCountry: countryCode, extract: false });
    } catch {
        return undefined;
    }
};

/**
 * Get the ISO country code libphonenumber resolves a number to.
 *
 * @param number {string}
 * @param countryCode {string} Country to assume when the number has no calling code
 *
 * @return {string|undefined} ISO 3166-1 alpha-2 code, or undefined if no region could be resolved
 */
export const getRegionCode = (number, countryCode = "US") => {
    return parse(number, countryCode)?.country;
};

/**
 * Formats the Phone Number for provided country code
 *
 * @param number {string}
 * @param countryCode {string}
 *
 * @return {string}
 */
export const formatPhoneNumber = (number, countryCode = "US") => {
    const phoneNumber = parse(number, countryCode);
    const regionCode = phoneNumber?.country;

    // Without a region we have nothing to format against, so show the seller what they entered
    if (!regionCode) {
        return number;
    }

    return regionCode === countryCode ? phoneNumber.formatNational() : phoneNumber.formatInternational();
};
