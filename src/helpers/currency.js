import getUserLocale from "get-user-locale";

const userLocale = getUserLocale();

const zeroDecimalCurrencies = new Set(["JPY", "CLP", "KRW", "LAK", "PYG", "VND", "VUV"]);

export const isZeroDecimal = (currency) => {
    return zeroDecimalCurrencies.has(currency);
};

export const getSymbol = (currency, locale = userLocale, amount = 0, narrowSymbolForm = false) => {
    const string = new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
        currencyDisplay: narrowSymbolForm ? "symbol" : "narrowSymbol",
    }).format(amount);

    return string.replace(/\d/g, "").trim();
};
