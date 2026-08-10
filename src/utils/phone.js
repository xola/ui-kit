import { parsePhoneNumberFromString } from "libphonenumber-js";

export const getRegionCode = (number, countryCode = "US") => {
    const phone = parsePhoneNumberFromString(number, countryCode);

    return phone?.country;
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
    const phone = parsePhoneNumberFromString(number, countryCode);

    if (!phone?.country) {
        // Couldn't detect a region, don't guess and return the original thing
        return number;
    }

    const format = phone.country === countryCode ? "NATIONAL" : "INTERNATIONAL";

    return phone.format(format);
};
