import getUserLocale from "get-user-locale";

const userLocale = getUserLocale();

const zeroDecimalCurrencies = ["JPY", "CLP", "KRW", "LAK", "PYG", "VND", "VUV"];

export const isZeroDecimal = (currency) => {
    return zeroDecimalCurrencies.includes(currency);
};

export const getSymbol = (currency, locale = userLocale, amount = 0) => {
    const string = new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
    }).format(amount);

    return string.replace(/\d/g, "").trim();
};
