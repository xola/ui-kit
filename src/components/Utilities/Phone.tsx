import clsx from "clsx";
import React from "react";
import { formatPhoneNumber, getRegionCode } from "../../helpers/phone";

export interface PhoneProps {
    countryCode?: string;
    children: string | number;
    className?: string;
}

export const Phone = ({ countryCode = "US", children, className }: PhoneProps) => {
    const number = children.toString();
    const formattedNumber = formatPhoneNumber(number, countryCode);
    const regionCode = getRegionCode(number, countryCode);

    return (
        <span
            className={clsx("ui-phone", className)}
            data-region-code={regionCode || "N/A"}
            data-country-code={countryCode}
            title={number}
        >
            {formattedNumber}
        </span>
    );
};
