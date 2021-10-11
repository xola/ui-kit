import clsx from "clsx";
import React from "react";

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

export const Breakdown = ({ children, className, ...rest }) => {
    return (
        <table className={clsx("ui-breakdown", "w-full", className)} {...rest}>
            <tbody>{children}</tbody>
        </table>
    );
};

const BreakdownItem = ({ children, info, value, className, color = "default", ...rest }) => {
    return (
        <tr className={clsx("ui-breakdown-item", colors[color], className)} {...rest}>
            <td className="text-left">{children}</td>
            <td className="text-right">{info}</td>

            <td style={{ width: "1%" }} className="pl-4 text-right">
                {value}
            </td>
        </tr>
    );
};

Breakdown.Item = BreakdownItem;
Breakdown.Item.displayName = "Breakdown.Item";

const BreakdownSubtotalItem = ({ children, info, value, className, color = "black", ...rest }) => {
    return (
        <tr className={clsx("ui-breakdown-subtotal-item", "font-bold", colors[color], className)} {...rest}>
            <td className="pt-1 pb-4 text-left">{children}</td>
            <td className="pt-1 pb-4 text-right">{info}</td>

            <td style={{ width: "1%" }} className="pt-1 pb-4 pl-4 text-right">
                {value}
            </td>
        </tr>
    );
};

Breakdown.SubtotalItem = BreakdownSubtotalItem;
Breakdown.SubtotalItem.displayName = "Breakdown.SubtotalItem";

const BreakdownSeparator = ({ className, ...rest }) => {
    return (
        <tr className={clsx("ui-breakdown-separator", className)} {...rest}>
            <td colSpan={3} className="pb-1 border-b border-gray-light" />
        </tr>
    );
};

Breakdown.Separator = BreakdownSeparator;
Breakdown.Separator.displayName = "Breakdown.Separator";
