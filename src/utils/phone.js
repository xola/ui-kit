import { PhoneNumberFormat, PhoneNumberUtil } from "google-libphonenumber";

const PNF = PhoneNumberFormat;

// PhoneNumberUtil.getInstance() eagerly builds the full region metadata. Defer it
// to first use (and memoize) so importing this module stays cheap and side-effect-light.
let cachedPhoneUtil;
const getPhoneUtil = () => {
    if (!cachedPhoneUtil) {
        cachedPhoneUtil = PhoneNumberUtil.getInstance();
    }

    return cachedPhoneUtil;
};

export const getRegionCode = (number, countryCode = "US") => {
    const phoneUtil = getPhoneUtil();

    try {
        const phoneObject = phoneUtil.parseAndKeepRawInput(number, countryCode);

        return phoneUtil.getRegionCodeForNumber(phoneObject);
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
export const formatPhoneNumber = (number, countryCode = "US") => {
    const phoneUtil = getPhoneUtil();

    try {
        let phoneObject = phoneUtil.parseAndKeepRawInput(number, countryCode);

        const regionCode = phoneUtil.getRegionCodeForNumber(phoneObject);
        if (regionCode && regionCode !== countryCode) {
            // If the region code is different than what was passed in, reparse according to that format
            phoneObject = phoneUtil.parseAndKeepRawInput(number, regionCode);
        }

        // Parse number for display in the region's format
        let formattedNumber;

        if (regionCode) {
            const format = regionCode === countryCode ? PNF.NATIONAL : PNF.INTERNATIONAL;
            formattedNumber = phoneUtil.format(phoneObject, format);
        } else {
            // If we didn't detect a region, don't guess and return the original thing
            formattedNumber = number;
        }

        return formattedNumber;
    } catch {
        return number;
    }
};
