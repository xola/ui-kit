import getUserLocale from "get-user-locale";

const userLocale = getUserLocale();

const zeroDecimalCurrencies = new Set(["JPY", "CLP", "KRW", "LAK", "PYG", "VND", "VUV", "MXN"]);

export const isZeroDecimal = (currency) => {
    return zeroDecimalCurrencies.has(currency);
};

export const getSymbol = (currency, locale = userLocale, amount = 0, isNarrowSymbolForm = false) => {
    const string = new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
        currencyDisplay: isNarrowSymbolForm ? "narrowSymbol" : "symbol",
    }).format(amount);

    return string.replace(/\d/g, "").trim();
};
