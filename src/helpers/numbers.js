import { round } from "mathjs";
import { isZeroDecimal } from "./currency";
import getUserLocale from "get-user-locale";

const userLocale = getUserLocale();

export const format = (amount, currency = null, locale = userLocale, maximumFractionDigits = 2) => {
    const style = currency ? "currency" : "decimal";
    if (currency) {
        return new Intl.NumberFormat(locale, { style, currency, maximumFractionDigits }).format(amount);
    } else {
        return new Intl.NumberFormat(locale, { style, maximumFractionDigits }).format(amount);
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
