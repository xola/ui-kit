import _ from "lodash";
import React from "react";
import { Currency } from "../../";

export default {
    title: "Utilities/Currency",
    component: Currency,
    parameters: {
        docs: {
            description: {
                component: "Currency formatter",
            },
        },
    },
    argTypes: {
        amount: {
            description: "A number",
            type: { required: true },
            defaultValue: "109482.84",
            control: { type: "number" },
            table: {
                type: { summary: "For demo only" },
            },
        },
        locale: {
            description: "A locale string",
            type: { required: true },
            defaultValue: "en-US",
            control: { type: "select" },
            options: ["en-IN", "en-US", "fr-FR", "ja-JP", "de-DE", "ar-AE"],
            table: {
                type: { summary: null },
                defaultValue: { summary: "Auto-detected based on browser settings" },
            },
        },
        currency: {
            description: "Three characater currency code",
            type: { required: true },
            control: { type: "select" },
            options: ["USD", "GBP", "EUR", "JPY", "INR", "AED"],
            table: {
                type: { summary: null },
                defaultValue: { summary: null },
            },
        },
        removeTrailingZeroes: {
            description: "Strip trailing `.00`",
            defaultValue: true,
            control: { type: "boolean" },
            table: {
                type: { summary: null },
                defaultValue: { summary: true },
            },
        },
    },
};

const amount = 109482.84;
const locale = "en-US";

export const Default = ({ currency, locale, removeTrailingZeroes, amount }) => {
    return (
        <Currency currency={currency} locale={locale} removeTrailingZeroes={removeTrailingZeroes}>
            {amount}
        </Currency>
    );
};

export const AllCurrencies = ({ amount, locale }) => {
    return (
        <div className="flex flex-col space-y-2">
            <span className="font-semibold">Amount: {amount}</span>
            <span className="pb-4 font-semibold">Locale: {locale}</span>
            <Currency locale={locale} currency="EUR">
                {amount}
            </Currency>
            <Currency locale={locale} currency="GBP">
                {amount}
            </Currency>
            <Currency locale={locale} currency="INR">
                {amount}
            </Currency>
            <Currency locale={locale} currency="AUD">
                {amount}
            </Currency>
            <Currency locale={locale} currency="CAD">
                {amount}
            </Currency>
            <Currency locale={locale} currency="NZD">
                {amount}
            </Currency>
            <Currency locale={locale} currency="MXN">
                {amount}
            </Currency>
            <Currency locale={locale} currency="JPY">
                {amount}
            </Currency>
            <Currency locale={locale} currency="CAD">
                {amount}
            </Currency>
        </div>
    );
};

export const RoundOnly = ({ amount }) => {
    return (
        <div className="flex flex-col space-y-2">
            <span className="mb-1 font-semibold">Amount: 109482.84</span>
            <span>
                Euro: <Currency.Round currency="EUR">{amount}</Currency.Round>
            </span>
            <span>
                JPY: <Currency.Round currency="JPY">{amount}</Currency.Round> (Zero decimal)
            </span>
        </div>
    );
};

export const SplitAmountFormatting = ({ amount, currency = "USD", locale = "en-USD" }) => {
    return (
        <Currency.Split currency={currency} locale={locale}>
            {amount}
        </Currency.Split>
    );
};
