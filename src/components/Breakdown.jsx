import clsx from "clsx";
import PropTypes from "prop-types";
import React, { createContext, useContext } from "react";
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

export const Breakdown = ({ children, className, currency, ...rest }) => {
    return (
        <CurrencyContext.Provider value={currency}>
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
};

const BreakdownItem = ({ children, info, value, className, color = "default", ...rest }) => {
    const currency = useContext(CurrencyContext);

    return (
        <tr className={clsx("ui-breakdown-item", colors[color], className)} {...rest}>
            <td className="text-left">{info} {children}</td>
            <td></td>

            <td className="w-[1%] whitespace-nowrap pl-4 text-right">
                <Currency shouldRemoveTrailingZeroes={false} currency={currency}>
                    {value}
                </Currency>
            </td>
        </tr>
    );
};

BreakdownItem.propTypes = {
    children: PropTypes.node,
    info: PropTypes.node,
    value: PropTypes.node,
    className: PropTypes.string,
    color: PropTypes.oneOf(Object.keys(colors)),
};

Breakdown.Item = BreakdownItem;
Breakdown.Item.displayName = "Breakdown.Item";

const BreakdownSubtotalItem = ({ children, info, value, className, color = "black", ...rest }) => {
    const currency = useContext(CurrencyContext);

    return (
        <tr className={clsx("ui-breakdown-subtotal-item", "font-bold", colors[color], className)} {...rest}>
            <td className="pt-1 pb-4 text-left">{children}</td>
            <td className="whitespace-nowrap pt-1 pb-4 text-right">{info}</td>

            <td className="w-[1%] whitespace-nowrap pt-1 pb-4 pl-4 text-right">
                <Currency shouldRemoveTrailingZeroes={false} currency={currency}>
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
