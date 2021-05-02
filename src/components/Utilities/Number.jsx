import React from "react";
import getUserLocale from "get-user-locale";
import { format, roundNumber } from "../../helpers/numbers";

const userLocale = getUserLocale();

export const Number = ({ locale = userLocale, maximumFractionDigits = 2, children }) => {
    const formattedNumber = format(children, null, locale, maximumFractionDigits);
    return <span className="formatted-number">{formattedNumber}</span>;
};
