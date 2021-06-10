import getUserLocale from "get-user-locale";
import _ from "lodash";

const userLocale = getUserLocale();

export const isZeroDecimal = (currency) => {
    const zeroDecimalCurrencies = ["JPY", "CLP", "KRW", "LAK", "PYG", "VND", "VUV"];
    return _.includes(zeroDecimalCurrencies, currency);
};

export const getSymbol = (currency, locale = userLocale, amount = 0) => {
    const string = new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
    }).format(amount);

    return string.replace(/\d/g, "").trim();
};
