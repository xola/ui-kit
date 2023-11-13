import React from "react";
import { Number, numberFormat } from "../..";

const NumberStories = {
    title: "Data Display/Number",
    component: Number,
    parameters: {
        docs: {
            description: {
                component: "Number formatter",
            },
        },
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
    },
};

export const Default = {
    args: {
        amount: 109_482.84,
        locale: "en-US",
        removeTrailingZeroes: true,
    },
    render: ({ amount, locale }) => {
        return (
            <div>
                <div className="mb-2">
                    Using the native
                    <a
                        className="mx-1"
                        href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat"
                    >
                        Intl.NumberFormat
                    </a>
                    API
                </div>
                <Number locale={locale}>{amount}</Number>
            </div>
        );
    },
};

export const CompactValues = {
    args: {
        locale: "en-US",
    },
    render: ({ locale }) => {
        const amounts = [123, 1234, 123_456, 123_456_789, 123_456_789_123];

        return amounts.map((amount) => (
            <div className="my-2 font-mono tracking-tighter">
                {numberFormat(amount, null, locale, 0)}:{" "}
                <span className="font-semibold">
                    <Number isCompact locale={locale}>
                        {amount}
                    </Number>
                </span>
            </div>
        ));
    },
};

export default NumberStories;
