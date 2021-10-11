import clsx from "clsx";
import React from "react";

const colors = {
    primary: "text-primary",
    secondary: "text-secondary",
    warning: "text-warning",
    success: "text-success",
    danger: "text-danger",
    caution: "text-caution",
};

export const Breakdown = ({ children }) => {
    return <table className="w-full text-gray-darker">{children}</table>;
};

const BreakdownItem = ({ children, value, icon, ...rest }) => {
    return (
        <tr {...rest}>
            <td className="text-left">{children}</td>
            <td className="text-right">{icon}</td>

            <td style={{ width: "1%" }} className="pl-4 text-right">
                {value}
            </td>
        </tr>
    );
};

Breakdown.Item = BreakdownItem;
Breakdown.Item.displayName = "Breakdown.Item";

const BreakdownSubtotalItem = ({ className, icon, children, value }) => {
    return (
        <tr className={clsx("font-bold text-black", className)}>
            <td colSpan={2} className="pt-1 pb-4 text-right">
                {children}
            </td>

            <td style={{ width: "1%" }} className="pt-1 pb-4 pl-4 text-right">
                {value}
            </td>
        </tr>
    );
};

Breakdown.SubtotalItem = BreakdownSubtotalItem;
Breakdown.SubtotalItem.displayName = "Breakdown.SubtotalItem";

const BreakdownSeparator = () => {
    return (
        <tr>
            <td colSpan={3} className="pb-1 border-b border-gray-light" />
        </tr>
    );
};

Breakdown.Separator = BreakdownSeparator;
Breakdown.Separator.displayName = "Breakdown.Separator";
