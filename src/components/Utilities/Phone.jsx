import React from "react";
import phoneLib from "google-libphonenumber";

const PNF = phoneLib.PhoneNumberFormat;
const phoneUtil = phoneLib.PhoneNumberUtil.getInstance();

export const Phone = ({ countryCode = "US", className, children }) => {
    const number = children;

    try {
        let phoneObj = phoneUtil.parseAndKeepRawInput(number, countryCode);

        const regionCode = phoneUtil.getRegionCodeForNumber(phoneObj);
        if (regionCode && regionCode !== countryCode) {
            // If the region code is different than what was passed in, reparse according to that format
            phoneObj = phoneUtil.parseAndKeepRawInput(number, regionCode);
        }

        // Parse number for display in the region's format
        let formattedNumber;
        if (regionCode) {
            const format = regionCode === countryCode ? PNF.NATIONAL : PNF.INTERNATIONAL;
            formattedNumber = phoneUtil.format(phoneObj, format);
        } else {
            // If we didn't detect a region, don't guess and return the original thing
            formattedNumber = number;
        }

        return (
            <span
                className={className}
                data-region-code={regionCode || "N/A"}
                data-country-code={countryCode}
                title={number}
            >
                {formattedNumber}
            </span>
        );
    } catch (err) {
        // console.log("Invalid phone number", number, err.message);
    }

    return (
        <span className={className} data-country-code={countryCode}>
            {number}
        </span>
    );
};
