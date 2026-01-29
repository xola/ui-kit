import React from "react";
import type { CountryCode } from "libphonenumber-js";
import cn from "../../helpers/classnames";
import { formatPhoneNumber, getRegionCode } from "../../helpers/phone";

export interface PhoneProps {
    countryCode?: CountryCode;
    children: string | number;
    className?: string;
}

export const Phone = ({ countryCode = "US", children, className }: PhoneProps) => {
    const number = children.toString();
    const formattedNumber = formatPhoneNumber(number, countryCode);
    const regionCode = getRegionCode(number, countryCode);

    return (
        <span
            className={cn("ui-phone", className)}
            data-region-code={regionCode ?? "N/A"}
            data-country-code={countryCode}
            title={number}
        >
            {formattedNumber}
        </span>
    );
};
