import * as getUserLocaleModule from "get-user-locale";

const getUserLocale = getUserLocaleModule.default || getUserLocaleModule;
const userLocale = getUserLocale();

const zeroDecimalCurrencies = new Set(["JPY", "CLP", "KRW", "LAK", "PYG", "VND", "VUV"]);

export const isZeroDecimal = (currency: string): boolean => {
    return zeroDecimalCurrencies.has(currency);
};

export const getSymbol = (
    currency: string,
    locale: string = userLocale,
    amount = 0,
    isNarrowSymbolForm = false,
): string => {
    const string = new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
        currencyDisplay: isNarrowSymbolForm ? "narrowSymbol" : "symbol",
    }).format(amount);

    return string.replace(/\d/g, "").trim();
};
