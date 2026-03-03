import phoneLib from "google-libphonenumber";

const PNF = phoneLib.PhoneNumberFormat;
const phoneUtil = phoneLib.PhoneNumberUtil.getInstance();

export const getRegionCode = (number: string, countryCode = "US"): string | undefined => {
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
export const formatPhoneNumber = (number: string, countryCode = "US"): string => {
    try {
        let phoneObject = phoneUtil.parseAndKeepRawInput(number, countryCode);

        const regionCode = phoneUtil.getRegionCodeForNumber(phoneObject);
        if (regionCode && regionCode !== countryCode) {
            // If the region code is different than what was passed in, reparse according to that format
            phoneObject = phoneUtil.parseAndKeepRawInput(number, regionCode);
        }

        // Parse number for display in the region's format

        let formattedNumber: string;

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
