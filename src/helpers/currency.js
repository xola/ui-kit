import getUserLocale from "get-user-locale";
import { almostZero, numberFormat } from "../helpers/numbers";
const userLocale = getUserLocale();

const zeroDecimalCurrencies = new Set(["JPY", "CLP", "KRW", "LAK", "PYG", "VND", "VUV"]);

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

export const getValueWithCurrency = (amount, currency) => {
    const userLocale = getUserLocale();

    const amountVariable = almostZero(amount) ? 0 : amount;
    const maxDigits = isZeroDecimal(currency) ? 0 : 2;
    const formattedAmount = numberFormat(amountVariable, currency, userLocale, maxDigits, false).replace(".00", "");

    return `${formattedAmount}`;
};
