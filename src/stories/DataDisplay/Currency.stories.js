import React from "react";
import { Currency } from "../..";

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
    args: {
        amount: 109_482.84,
        locale: "en-US",
        removeTrailingZeroes: true,
    },
    argTypes: {
        amount: {
            description: "A number",
            type: { required: true },
            control: { type: "number" },
            table: {
                type: { summary: "For demo only" },
            },
        },
        locale: {
            description: "A locale string",
            type: { required: true },
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
            control: { type: "boolean" },
            table: {
                type: { summary: null },
                defaultValue: { summary: true },
            },
        },
    },
};

export const Default = ({ currency, locale, removeTrailingZeroes, amount }) => {
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
                {amount}
            </Currency>
        </div>
    );
};

export const AllCurrencies = ({ amount, locale }) => {
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
};

export const LocalesWithUSDollar = () => {
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
};

export const RoundOnly = () => {
    const amount = 109_482.9123123;
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
};

export const SplitAmountFormatting = ({ amount, currency = "USD", locale = "en-USD" }) => {
    return (
        <Currency.Split currency={currency} locale={locale}>
            {amount}
        </Currency.Split>
    );
};

export default CurrencyStories;
