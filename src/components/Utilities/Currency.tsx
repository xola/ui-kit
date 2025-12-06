import { getUserLocale } from "get-user-locale";
import React from "react";
import { getSymbol, isZeroDecimal } from "../../helpers/currency";
import { almostZero, numberFormat, roundNumber } from "../../helpers/numbers";

const userLocale = getUserLocale();

export interface CurrencyProps {
    currency?: string;
    locale?: string;
    shouldRemoveTrailingZeroes?: boolean;
    maximumFractionDigits?: number;
    compact?: boolean;
    isNarrowSymbolForm?: boolean;
    children: number;
}

export const Currency = ({
    currency = "USD",
    locale = userLocale,
    shouldRemoveTrailingZeroes = true,
    maximumFractionDigits = 2,
    compact = false,
    isNarrowSymbolForm,
    children,
}: CurrencyProps) => {
    let amount = children;
    if (almostZero(amount)) {
        amount = 0;
    }

    const maxDigits = isZeroDecimal(currency) ? 0 : maximumFractionDigits;
    let formattedAmount = numberFormat(amount, currency, locale, maxDigits, compact, isNarrowSymbolForm);

    const isNegative = amount < 0;
    if (isNegative) {
        formattedAmount = formattedAmount.replace("-", "");
    }

    if (compact) {
        return (
            <span className="ui-currency">
                {isNegative && "-"}
                {getSymbol(currency, locale, 0, isNarrowSymbolForm)}
                {formattedAmount}
            </span>
        );
    }

    formattedAmount = shouldRemoveTrailingZeroes ? formattedAmount.replace(".00", "") : formattedAmount;
    return (
        <span className="ui-currency">
            {isNegative && "-"}
            {formattedAmount}
        </span>
    );
};

// TODO: See if this feature can be implemented as a prop on `Currency` component.
interface CurrencyRoundProps {
    currency?: string;
    children: number;
}

const Round = ({ currency = "USD", children }: CurrencyRoundProps) => {
    const number = roundNumber(currency, children);
    return <span className="ui-currency-round">{number}</span>;
};

Round.displayName = "Currency.Round";

interface CurrencySplitProps {
    currency?: string;
    locale?: string;
    isNarrowSymbolForm?: boolean;
    children: number;
}

const Split = ({ currency = "USD", locale = userLocale, isNarrowSymbolForm, children }: CurrencySplitProps) => {
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

    const formattedAmountInt = numberFormat(Number(amountInt), currency, locale, 0, false, isNarrowSymbolForm);

    return (
        <span title={amount.toString()} className="ui-currency-split">
            <span className="ui-currency-split-int">{formattedAmountInt}</span>
            {!isZeroDecimal(currency) && (
                <span className="ui-currency-split-decimal pl-1">
                    <sup>{amountDecimal}</sup>
                </span>
            )}
        </span>
    );
};

Split.displayName = "Currency.Split";

Currency.Round = Round;
Currency.Split = Split;

export type { CurrencyRoundProps, CurrencySplitProps };
