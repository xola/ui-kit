import { round } from "mathjs";
import { isZeroDecimal } from "./currency";
import getUserLocale from "get-user-locale";

const userLocale = getUserLocale();

export const almostZero = (number) => {
    const absAmount = Math.abs(number);
    return absAmount >= 0 && absAmount <= 0.001;
};

export const numberFormat = (amount, currency = null, locale = userLocale, maximumFractionDigits = 2) => {
    const minimumFractionDigits = maximumFractionDigits; // This is required for the spec because it breaks in Safari https://github.com/andyearnshaw/Intl.js/issues/123
    const style = currency ? "currency" : "decimal";
    if (currency) {
        return new Intl.NumberFormat(locale, { style, currency, minimumFractionDigits, maximumFractionDigits }).format(amount);
    } else {
        return new Intl.NumberFormat(locale, { style, minimumFractionDigits, maximumFractionDigits }).format(amount);
    }
};

export const roundNumber = (currency, amount) => {
    let num = Number(amount);

    if (isZeroDecimal(currency)) {
        num = round(num);
    } else {
        // It's done this odd way to ensure JS rounds numbers the same way as PHP
        if (round(num, 3) === round(num, 4)) {
            num = round(num, 3);
        }
        num = round(num, 2);
    }

    return num;
};
