export const isZeroDecimal = (currency) => {
    var zeroDecimalCurrencies = ["JPY", "CLP", "KRW", "LAK", "PYG", "VND", "VUV"];
    return _.includes(zeroDecimalCurrencies, currency);
};

export const getSymbol = (currency, locale = userLocale, amount = 0) => {
    const str = new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
    }).format(amount);

    return str.replace(/\d/g, "").trim();
};
