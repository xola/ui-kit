import React from "react";
import { format } from "./Number";
import { round } from "mathjs";
import getUserLocale from "get-user-locale";

const userLocale = getUserLocale();

const isZeroDecimal = (currency) => {
    var zeroDecimalCurrencies = ["JPY", "CLP", "KRW", "LAK", "PYG", "VND", "VUV"];
    return _.includes(zeroDecimalCurrencies, currency);
};

const getSymbol = (currency, locale = userLocale) => {
    const str = new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(0);

    return str.replace(/\d/g, "").trim();
};

export const Currency = ({ currency = "USD", locale = userLocale, removeTrailingZeroes = true, children }) => {
    const amount = children;
    let formattedAmount = format(amount, currency, locale);
    formattedAmount = removeTrailingZeroes ? formattedAmount.replace(".00", "") : formattedAmount;

    return <span className="currency-formatted-amount">{formattedAmount}</span>;
};

Currency.Round = ({ currency, children }) => {
    let num = Number(children);
    console.log(currency, children, num);

    if (isZeroDecimal(currency)) {
        num = round(num);
    } else {
        // It's done this odd way to ensure JS rounds numbers the same way as PHP
        if (round(num, 3) === round(num, 4)) {
            num = round(num, 3);
        }
        num = round(num, 2);
    }

    return (<span className="currency-rounded">{num}</span>)
};
