import * as getUserLocaleModule from "get-user-locale";
import { round } from "lodash";
import { isZeroDecimal } from "./currency";

const getUserLocale = getUserLocaleModule.default || getUserLocaleModule;
const userLocale = getUserLocale();

export const almostZero = (number: number): boolean => {
    const absAmount = Math.abs(number);
    return absAmount >= 0 && absAmount <= 0.001;
};

export const numberFormat = (
    amount: number,
    currency: string | null = null,
    locale: string = userLocale,
    maximumFractionDigits = 2,
    isCompact = false,
    isNarrowSymbolForm = false,
): string => {
    const style = currency ? "currency" : "decimal";

    const params: Intl.NumberFormatOptions = {
        style,
        minimumFractionDigits: maximumFractionDigits,
        maximumFractionDigits,
    };

    if (currency) {
        params.currency = currency;
        params.currencyDisplay = isNarrowSymbolForm ? "narrowSymbol" : "symbol";
    }

    return isCompact ? compactNumber(amount, locale) : new Intl.NumberFormat(locale, params).format(amount);
};

export const roundNumber = (currency: string, amount: number): number => {
    let number = Number(amount);

    if (isZeroDecimal(currency)) {
        return round(number);
    }

    if (round(number, 3) === round(number, 4)) {
        number = round(number, 3);
    }

    return round(number, 2);
};

export const compactNumber = (value: number, locale: string = userLocale): string => {
    return new Intl.NumberFormat(locale, { notation: "compact", maximumFractionDigits: 2 }).format(value);
};
