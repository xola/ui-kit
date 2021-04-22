import React from "react";
import { format } from "../../utilities/number";
import { round } from "mathjs";
import getUserLocale from "get-user-locale";

const userLocale = getUserLocale();

// Split into utilities & components

const isZeroDecimal = (currency) => {
    var zeroDecimalCurrencies = ["JPY", "CLP", "KRW", "LAK", "PYG", "VND", "VUV"];
    return _.includes(zeroDecimalCurrencies, currency);
};

const getSymbol = (currency, locale = userLocale, amount = 0) => {
    const str = new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
    }).format(amount);

    return str.replace(/\d/g, "").trim();
};

export const Currency = ({ currency = "USD", locale = userLocale, removeTrailingZeroes = true, children }) => {
    const amount = children;
    let formattedAmount = format(amount, currency, locale, isZeroDecimal(currency) ? 0 : 2);
    formattedAmount = removeTrailingZeroes ? formattedAmount.replace(".00", "") : formattedAmount;

    return <span className="currency-formatted-amount">{formattedAmount}</span>;
};

const round2 = (currency, amount) => {
    let num = Number(amount);

    if (isZeroDecimal(currency)) {
        num = round(num);
    } else {
        // It's done this odd way to ensure JS rounds numbers the same way as PHP
        if (round(num, 3) === round(num, 4)) {
            num = round(num, 3);
        }
        num = round(num, 2);
    }

    return num;
}

Currency.Round = ({ currency, children }) => {
    const num = round2(currency, children);

    return <span className="currency-rounded">{num}</span>;
};

Currency.Split = ({ currency = "USD", locale = userLocale, children }) => {
    const amount = children;
    const roundedAmountArray = round2(currency, amount).toString().split(".");
    const amountInt = roundedAmountArray[0];
    let amountDecimal = roundedAmountArray[1] || "0";

    // Appends '0' if the length of decimal value is 1 i.e 99.1 will become 99.10
    if (amountDecimal.length == 1) {
        amountDecimal += "0";
    }

    const formattedAmountInt = format(amountInt, currency, locale, 0);

    return (
        <span title={amount} className="currency-formatted-split-amount">
            <span className="amount-int">{formattedAmountInt}</span>
            {!isZeroDecimal(currency) && <span className="pl-1 underline amount-decimal">
                <sup>{amountDecimal}</sup>
            </span>}
        </span>
    );
};
