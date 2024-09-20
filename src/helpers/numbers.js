import getUserLocale from "get-user-locale";
import { round } from "lodash-es";
import { isZeroDecimal } from "./currency";

const userLocale = getUserLocale();

export const almostZero = (number) => {
    const absAmount = Math.abs(number);
    return absAmount >= 0 && absAmount <= 0.001;
};

export const numberFormat = (
    amount,
    currency = null,
    locale = userLocale,
    maximumFractionDigits = 2,
    isCompact = false,
    isNarrowSymbolForm = false,
) => {
    const style = currency ? "currency" : "decimal";

    const params = { style, minimumFractionDigits: maximumFractionDigits, maximumFractionDigits };

    if (currency) {
        params.currency = currency;
        params.currencyDisplay = isNarrowSymbolForm ? "narrowSymbol" : "symbol";
    }

    return isCompact ? compactNumber(amount, locale) : new Intl.NumberFormat(locale, params).format(amount);
};

export const roundNumber = (currency, amount) => {
    let number = Number(amount);

    if (isZeroDecimal(currency)) {
        return round(number);
    }

    // It's done this odd way to ensure JS rounds numbers the same way as PHP
    if (round(number, 3) === round(number, 4)) {
        number = round(number, 3);
    }

    return round(number, 2);
};

export const compactNumber = (value, locale = userLocale) => {
    return new Intl.NumberFormat(locale, { notation: "compact", maximumFractionDigits: 2 }).format(value);
};
