import clsx from "clsx";
import { isNumber } from "lodash";
import React, { createContext, useContext, useMemo } from "react";
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
} as const;

type BreakdownColor = keyof typeof colors;

interface CurrencyContextValue {
    currency?: string;
    locale?: string;
}

const CurrencyContext = createContext<CurrencyContextValue | undefined>(undefined);

export interface BreakdownProps extends React.TableHTMLAttributes<HTMLTableElement> {
    children?: React.ReactNode;
    className?: string;
    currency: string;
    locale?: string;
}

const BreakdownComponent = ({ children, className, currency, locale, ...rest }: BreakdownProps) => {
    const value = useMemo(() => ({ currency, locale }), [currency, locale]);
    return (
        <CurrencyContext.Provider value={value}>
            <table className={clsx("ui-breakdown", "w-full", className)} {...rest}>
                <tbody>{children}</tbody>
            </table>
        </CurrencyContext.Provider>
    );
};

export interface BreakdownItemProps extends React.HTMLAttributes<HTMLTableRowElement> {
    children?: React.ReactNode;
    info?: React.ReactNode;
    methodIcon?: React.ReactNode;
    secondary?: React.ReactNode;
    value?: React.ReactNode;
    className?: string;
    classNames?: {
        key?: string;
        children?: string;
        info?: string;
        value?: string;
    };
    color?: BreakdownColor;
}

const BreakdownItem = ({
    info,
    methodIcon,
    secondary,
    value,
    color = "default",
    className,
    classNames = {},
    children,
    ...rest
}: BreakdownItemProps) => {
    const context = useContext(CurrencyContext);
    const currency = context?.currency;
    const locale = context?.locale;

    return (
        <tr className={clsx("ui-breakdown-item", colors[color], className)} {...rest}>
            <td colSpan={2} className={clsx("break-words text-left leading-none", classNames.key)}>
                <span className="mr-0.5">{methodIcon}</span>
                <span className={clsx("mr-1 break-normal md:break-all", classNames.children)}>{children ?? ""}</span>
                <span className={clsx("text-sm", classNames.info)}>
                    {info && (
                        <span className="mr-2 rounded bg-white p-1 uppercase text-black empty:hidden">{info}</span>
                    )}
                    {secondary && <span className="empty:hidden">{secondary}</span>}
                </span>
            </td>

            <td className={clsx("w-[1%] whitespace-nowrap pl-4 text-right", classNames.value)}>
                {isNumber(value) ? (
                    <Currency
                        shouldRemoveTrailingZeroes={false}
                        currency={currency}
                        locale={locale}
                        compact={undefined}
                        isNarrowSymbolForm={undefined}
                    >
                        {value}
                    </Currency>
                ) : (
                    <span>{value}</span>
                )}
            </td>
        </tr>
    );
};

BreakdownItem.displayName = "Breakdown.Item";

export interface BreakdownSubtotalItemProps extends React.HTMLAttributes<HTMLTableRowElement> {
    children?: React.ReactNode;
    info?: React.ReactNode;
    value?: React.ReactNode;
    className?: string;
    classNames?: {
        children?: string;
        info?: string;
        value?: string;
    };
    color?: BreakdownColor;
}

const BreakdownSubtotalItem = ({
    info,
    value,
    color = "black",
    className,
    classNames = {},
    children,
    ...rest
}: BreakdownSubtotalItemProps) => {
    const context = useContext(CurrencyContext);
    const currency = context?.currency;
    const locale = context?.locale;

    return (
        <tr className={clsx("ui-breakdown-subtotal-item", "font-bold", colors[color], className)} {...rest}>
            <td className={clsx("pt-1 pb-4 text-left", classNames.children)}>{children}</td>
            <td className={clsx("whitespace-nowrap pt-1 pb-4 text-right", classNames.info)}>{info}</td>

            <td className={clsx("w-[1%] whitespace-nowrap pt-1 pb-4 pl-4 text-right", classNames.value)}>
                <Currency
                    shouldRemoveTrailingZeroes={false}
                    currency={currency}
                    locale={locale}
                    compact={undefined}
                    isNarrowSymbolForm={undefined}
                >
                    {value ?? 0}
                </Currency>
            </td>
        </tr>
    );
};

BreakdownSubtotalItem.displayName = "Breakdown.SubtotalItem";

export interface BreakdownSeparatorProps extends React.HTMLAttributes<HTMLTableRowElement> {
    className?: string;
}

const BreakdownSeparator = ({ className, ...rest }: BreakdownSeparatorProps) => {
    return (
        <tr className={clsx("ui-breakdown-separator", className)} {...rest}>
            <td colSpan={3} className="border-b border-gray-light pb-1" />
        </tr>
    );
};

BreakdownSeparator.displayName = "Breakdown.Separator";

export const Breakdown = Object.assign(BreakdownComponent, {
    Item: BreakdownItem,
    SubtotalItem: BreakdownSubtotalItem,
    Separator: BreakdownSeparator,
});
