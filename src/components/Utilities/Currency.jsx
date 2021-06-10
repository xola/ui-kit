import getUserLocale from "get-user-locale";
import React from "react";
import PropTypes from "prop-types";
import { isZeroDecimal } from "../../helpers/currency";
import { almostZero, numberFormat, roundNumber } from "../../helpers/numbers";

const userLocale = getUserLocale();

export const Currency = ({
    currency = "USD",
    locale = userLocale,
    removeTrailingZeroes = true,
    maximumFractionDigits = 2,
    children,
}) => {
    let amount = children;
    if (almostZero(amount)) {
        amount = 0;
    }

    let formattedAmount = numberFormat(amount, currency, locale, isZeroDecimal(currency) ? 0 : maximumFractionDigits);
    formattedAmount = removeTrailingZeroes ? formattedAmount.replace(".00", "") : formattedAmount;

    return <span className="currency-formatted-amount">{formattedAmount}</span>;
};

Currency.propTypes = {
    currency: PropTypes.string,
    locale: PropTypes.string,
    removeTrailingZeroes: PropTypes.bool,
    maximumFractionDigits: PropTypes.number,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
};

Currency.Round = ({ currency, children }) => {
    const number = roundNumber(currency, children);
    return <span className="currency-rounded">{number}</span>;
};

Currency.Round.propTypes = {
    currency: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
};

Currency.Split = ({ currency = "USD", locale = userLocale, children }) => {
    let amount = children;
    if (almostZero(amount)) {
        amount = 0;
    }

    const roundedAmountArray = roundNumber(currency, amount).toString().split(".");
    const amountInt = roundedAmountArray[0];
    let amountDecimal = roundedAmountArray[1] || "0";

    // Appends '0' if the length of decimal value is 1 i.e 99.1 will become 99.10
    if (amountDecimal.length === 1) {
        amountDecimal += "0";
    }

    const formattedAmountInt = numberFormat(amountInt, currency, locale, 0);

    return (
        <span title={amount} className="currency-formatted-split-amount">
            <span className="amount-int">{formattedAmountInt}</span>
            {!isZeroDecimal(currency) && (
                <span className="pl-1 underline amount-decimal">
                    <sup>{amountDecimal}</sup>
                </span>
            )}
        </span>
    );
};

Currency.Split.propTypes = {
    currency: PropTypes.string,
    locale: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
};
