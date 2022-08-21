import { round } from "lodash";
import getUserLocale from "get-user-locale";
import { isZeroDecimal } from "./currency";

const userLocale = getUserLocale();

export const almostZero = (number) => {
    const absAmount = Math.abs(number);
    return absAmount >= 0 && absAmount <= 0.001;
};

export const numberFormat = (amount, currency = null, locale = userLocale, maximumFractionDigits = 2) => {
    const style = currency ? "currency" : "decimal";

    const params = { style, minimumFractionDigits: maximumFractionDigits, maximumFractionDigits };
    if (currency) {
        params.currency = currency;
    }

    return new Intl.NumberFormat(locale, params).format(amount);
};

export const roundNumber = (currency, amount) => {
    let number = Number(amount);

    if (isZeroDecimal(currency)) {
        number = round(number);
    } else {
        // It's done this odd way to ensure JS rounds numbers the same way as PHP
        if (round(number, 3) === round(number, 4)) {
            number = round(number, 3);
        }

        number = round(number, 2);
    }

    return number;
};
