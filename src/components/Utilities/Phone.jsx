import cn from "../../helpers/classnames";
import PropTypes from "prop-types";
import React from "react";
import { formatPhoneNumber, getRegionCode } from "../../helpers/phone";

export const Phone = ({ countryCode = "US", className, children }) => {
    const number = children;
    const formattedNumber = formatPhoneNumber(number, countryCode);
    const regionCode = getRegionCode(number, countryCode);

    return (
        <span
            className={cn("ui-phone", className)}
            data-region-code={regionCode || "N/A"}
            data-country-code={countryCode}
            title={number}
        >
            {formattedNumber}
        </span>
    );
};

Phone.propTypes = {
    countryCode: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};
