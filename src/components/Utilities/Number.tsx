import { getUserLocale } from "get-user-locale";
import React from "react";
import { numberFormat } from "../../helpers/numbers";

const userLocale = getUserLocale();

export interface NumberProps {
    readonly locale?: string;
    readonly maximumFractionDigits?: number;
    readonly isCompact?: boolean;
    children: number;
}

export const Number = ({
    locale = userLocale,
    maximumFractionDigits = 2,
    isCompact = false,
    children,
}: NumberProps) => {
    const formattedNumber = numberFormat(children, null, locale, maximumFractionDigits, isCompact);
    return <span className="ui-number">{formattedNumber}</span>;
};
