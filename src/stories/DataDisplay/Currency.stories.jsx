import React from "react";
import { Currency, numberFormat } from "../..";

const CurrencyStories = {
    title: "Data Display/Currency",
    component: Currency,
    parameters: {
        docs: {
            description: {
                component: "Currency formatter",
            },
        },
    },
    tags: ["autodocs"],
    args: {
        amount: 109_482.84,
        locale: "en-US",
        removeTrailingZeroes: true,
    },
    argTypes: {
        currency: {
            description: "Three character currency code",
            type: { required: true },
            control: { type: "select" },
            options: ["USD", "GBP", "EUR", "JPY", "INR", "AED"],
        },
        removeTrailingZeroes: {
            description: "Strip trailing `.00`",
        },
        locale: {
            description: "A locale string",
            type: { required: true },
            control: { type: "select" },
            options: ["en-IN", "en-US", "fr-FR", "ja-JP", "de-DE", "ar-AE", "en-CA", "fr-CA"],
        },
    },
};

export const Default = {
    render: ({ currency, locale, removeTrailingZeroes, amount, children }) => {
        return (
            <div>
                <div className="mb-2">
                    Using the native{" "}
                    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat">
                        Intl.NumberFormat
                    </a>{" "}
                    API
                </div>
                <Currency currency={currency} locale={locale} removeTrailingZeroes={removeTrailingZeroes}>
                    {children}
                </Currency>
            </div>
        );
    },
};

export const AllCurrencies = {
    render: ({ amount, locale }) => {
        const currencies = ["EUR", "GBP", "INR", "AUD", "CAD", "NZD", "MXN", "JPY", "AED"];
        return (
            <div className="flex flex-col space-y-2">
                <span className="font-semibold">Amount: {amount}</span>
                <span className="pb-4 font-semibold">Locale: {locale}</span>
                {currencies.map((currency) => {
                    return (
                        <span className="flex space-x-4">
                            <span>{currency}</span>
                            <Currency locale={locale} currency={currency}>
                                {amount}
                            </Currency>
                        </span>
                    );
                })}
            </div>
        );
    },
};

export const LocalesWithUSDollar = {
    render: (args) => {
        const locales = ["en-US", "en-GB", "en-AU", "ar-AE", "de-DE", "fr-FR", "ja-JP", "en-IN", "es-ES"];
        return (
            <div>
                <div className="pb-4 text-base">
                    US Dollar amount in a few popular locales using the currency's narrow symbol
                </div>
                {locales.map((locale) => {
                    return (
                        <div className="my-2 space-x-4">
                            <span>Locale: {locale}</span>
                            <span className="font-mono">
                                <Currency locale={locale} currency="USD">
                                    {109_482.84}
                                </Currency>
                            </span>
                        </div>
                    );
                })}
            </div>
        );
    },
};

export const RoundOnly = {
    render: (args) => {
        const amount = 109_482.912_312_3;
        return (
            <div className="flex flex-col space-y-2">
                <span className="mb-1 font-semibold">Amount: {amount}</span>
                <span>
                    Euro: <Currency.Round currency="EUR">{amount}</Currency.Round>
                </span>
                <span>
                    JPY: <Currency.Round currency="JPY">{amount}</Currency.Round> (Zero decimal)
                </span>
            </div>
        );
    },
};

export const SplitAmountFormatting = {
    render: ({ currency, locale, amount }) => {
        return (
            <Currency.Split currency={currency} locale={locale}>
                {amount}
            </Currency.Split>
        );
    },
};

export const CompactValues = {
    render: ({ locale }) => {
        const amounts = [123, 1234, 123_456, 123_456_789, 123_456_789_123];

        return amounts.map((amount) => (
            <div className="my-2 font-mono tracking-tighter">
                {numberFormat(amount, null, locale, 0)}:{" "}
                <span className="font-semibold">
                    <Currency compact locale={locale}>
                        {amount}
                    </Currency>
                </span>
            </div>
        ));
    },
};

export default CurrencyStories;
