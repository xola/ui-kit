import clsx from "clsx";
import PropTypes from "prop-types";
import React, { createContext, useContext, useMemo } from "react";
import { isNumber } from "lodash";
import { Currency } from "./Utilities/Currency";

const colors = {
    default: "text-gray-darker",
    black: "text-black",
    primary: "text-primary",
    secondary: "text-secondary",
    warning: "text-warning",
    success: "text-success",
    danger: "text-danger",
    caution: "text-caution",
};

const CurrencyContext = createContext();

export const Breakdown = ({ children, className, currency, locale, ...rest }) => {
    const value = useMemo(() => ({ currency, locale }), [currency, locale]);
    return (
        <CurrencyContext.Provider value={value}>
            <table className={clsx("ui-breakdown", "w-full", className)} {...rest}>
                <tbody>{children}</tbody>
            </table>
        </CurrencyContext.Provider>
    );
};

Breakdown.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    currency: PropTypes.string.isRequired,
    locale: PropTypes.string,
};

const BreakdownItem = ({ children, info, methodIcon, secondary, value, className, color = "default", ...rest }) => {
    /** When BreakdownItem is directly used without outer <Breakdown /> component, the context would be `undefined` */
    const { currency, locale } = useContext(CurrencyContext) ?? {};

    return (
        <tr className={clsx("ui-breakdown-item", colors[color], className)} {...rest}>
            <td colSpan={2} className="break-all text-left leading-none">
                <span className="mr-0.5">{methodIcon}</span>
                <span>{children}</span>
                <span className="ml-1 text-sm">
                    {info && (
                        <span className="mr-2 rounded bg-white p-1 uppercase text-black empty:hidden">{info}</span>
                    )}
                    {secondary && <span className="empty:hidden">{secondary}</span>}
                </span>
            </td>

            <td className="w-[1%] whitespace-nowrap pl-4 text-right">
                {isNumber(value) ? (
                    <Currency shouldRemoveTrailingZeroes={false} currency={currency} locale={locale}>
                        {value}
                    </Currency>
                ) : (
                    <span>{value}</span>
                )}
            </td>
        </tr>
    );
};

BreakdownItem.propTypes = {
    children: PropTypes.node,
    info: PropTypes.node,
    methodIcon: PropTypes.node,
    secondary: PropTypes.node,
    value: PropTypes.node,
    className: PropTypes.string,
    color: PropTypes.oneOf(Object.keys(colors)),
};

Breakdown.Item = BreakdownItem;
Breakdown.Item.displayName = "Breakdown.Item";

const BreakdownSubtotalItem = ({ children, info, value, className, color = "black", ...rest }) => {
    const { currency, locale } = useContext(CurrencyContext);

    return (
        <tr className={clsx("ui-breakdown-subtotal-item", "font-bold", colors[color], className)} {...rest}>
            <td className="pt-1 pb-4 text-left">{children}</td>
            <td className="whitespace-nowrap pt-1 pb-4 text-right">{info}</td>

            <td className="w-[1%] whitespace-nowrap pt-1 pb-4 pl-4 text-right">
                <Currency shouldRemoveTrailingZeroes={false} currency={currency} locale={locale}>
                    {value}
                </Currency>
            </td>
        </tr>
    );
};

BreakdownSubtotalItem.propTypes = {
    children: PropTypes.node,
    info: PropTypes.node,
    value: PropTypes.node,
    className: PropTypes.string,
    color: PropTypes.oneOf(Object.keys(colors)),
};

Breakdown.SubtotalItem = BreakdownSubtotalItem;
Breakdown.SubtotalItem.displayName = "Breakdown.SubtotalItem";

const BreakdownSeparator = ({ className, ...rest }) => {
    return (
        <tr className={clsx("ui-breakdown-separator", className)} {...rest}>
            <td colSpan={3} className="border-b border-gray-light pb-1" />
        </tr>
    );
};

BreakdownSeparator.propTypes = {
    className: PropTypes.string,
};

Breakdown.Separator = BreakdownSeparator;
Breakdown.Separator.displayName = "Breakdown.Separator";
