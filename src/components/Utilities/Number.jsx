import getUserLocale from "get-user-locale";
import React from "react";
import { numberFormat } from "../../helpers/numbers";

const userLocale = getUserLocale();

export const Number = ({ locale = userLocale, maximumFractionDigits = 2, children }) => {
    const formattedNumber = numberFormat(children, null, locale, maximumFractionDigits);
    return <span className="formatted-number">{formattedNumber}</span>;
};
