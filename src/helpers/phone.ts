import phoneLib from "google-libphonenumber";

const PNF = phoneLib.PhoneNumberFormat;
const phoneUtil = phoneLib.PhoneNumberUtil.getInstance();

export const getRegionCode = (number: string, countryCode: string = "US"): string | undefined => {
    try {
        const phoneObject = phoneUtil.parseAndKeepRawInput(number, countryCode);

        return phoneUtil.getRegionCodeForNumber(phoneObject);
    } catch {
        return undefined;
    }
};

/**
 * Formats the Phone Number for provided country code
 */
export const formatPhoneNumber = (number: string, countryCode: string = "US"): string => {
    try {
        let phoneObject = phoneUtil.parseAndKeepRawInput(number, countryCode);

        const regionCode = phoneUtil.getRegionCodeForNumber(phoneObject);
        if (regionCode && regionCode !== countryCode) {
            phoneObject = phoneUtil.parseAndKeepRawInput(number, regionCode);
        }

        let formattedNumber: string;

        if (regionCode) {
            const format = regionCode === countryCode ? PNF.NATIONAL : PNF.INTERNATIONAL;
            formattedNumber = phoneUtil.format(phoneObject, format);
        } else {
            formattedNumber = number;
        }

        return formattedNumber;
    } catch {
        return number;
    }
};
