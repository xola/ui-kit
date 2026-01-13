import { parsePhoneNumber, type CountryCode } from "libphonenumber-js";

export const getRegionCode = (number: string, countryCode: CountryCode = "US"): string | undefined => {
    try {
        const phoneNumber = parsePhoneNumber(number, countryCode);

        return phoneNumber?.country;
    } catch {
        return undefined;
    }
};

/**
 * Formats the Phone Number for provided country code
 *
 * @param number {string}
 * @param countryCode {string}
 *
 * @return {string}
 */
export const formatPhoneNumber = (number: string, countryCode: CountryCode = "US"): string => {
    try {
        let phoneNumber = parsePhoneNumber(number, countryCode);

        if (!phoneNumber) {
            return number;
        }

        const regionCode = phoneNumber.country;
        if (regionCode && regionCode !== countryCode) {
            // If the region code is different than what was passed in, reparse according to that format
            phoneNumber = parsePhoneNumber(number, regionCode);
        }

        // Parse number for display in the region's format
        let formattedNumber: string;

        if (regionCode && phoneNumber) {
            formattedNumber =
                regionCode === countryCode ? phoneNumber.formatNational() : phoneNumber.formatInternational();
        } else {
            // If we didn't detect a region, don't guess and return the original thing
            formattedNumber = number;
        }

        return formattedNumber;
    } catch {
        return number;
    }
};
