import getUserLocale from "get-user-locale";

const userLocale = getUserLocale();

export const format = (amount, currency, locale = userLocale) => {
    const style = currency ? "currency" : "decimal";
    return new Intl.NumberFormat(locale, { style, currency }).format(amount);
};
