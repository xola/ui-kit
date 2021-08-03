import React from "react";
import phoneLib from "google-libphonenumber";
import PropTypes from "prop-types";

const PNF = phoneLib.PhoneNumberFormat;
const phoneUtil = phoneLib.PhoneNumberUtil.getInstance();

export const Phone = ({ countryCode = "US", className, children }) => {
    const number = children;

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
    } catch (error) {
        console.debug("Invalid phone number", number, error.message);
    }

    return (
        <span className={className} data-country-code={countryCode}>
            {number}
        </span>
    );
};

Phone.propTypes = {
    countryCode: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};
