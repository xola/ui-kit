import React, { type ElementType } from "react";
import cn from "../../helpers/classnames";

const variants = {
    default: (isActive: boolean) =>
        cn(
            "border-b border-gray-light",
            isActive ? "text-primary border-l border-r border-b-transparent" : "hover:text-gray-darker",
        ),

    simple: (isActive: boolean) =>
        cn(
            "flex-1 text-lg transition-colors",
            isActive ? "bg-white text-black" : "text-gray-dark hover:text-black hover:bg-gray-light",
        ),
} as const;

type TabVariant = keyof typeof variants;

export interface TabProps<T extends ElementType = "button"> {
    as?: T;
    variant?: TabVariant;
    isActive?: boolean;
    isHidden?: boolean;
    children?: React.ReactNode;
    className?: string;
}

export const Tab = <T extends ElementType = "button">({
    variant = "default",
    as,
    isActive = false,
    isHidden = false,
    className,
    ...rest
}: TabProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof TabProps<T>>) => {
    const Tag = as ?? "button";

    if (isHidden) {
        return null;
    }

    return (
        <Tag
            className={cn(
                "ui-tabs-tab",
                className,
                "cursor-pointer whitespace-nowrap px-8 py-4 text-center font-semibold focus-visible:ring",
                variants[variant](isActive),
            )}
            {...rest}
        />
    );
};

Tab.displayName = "Tabs.Tab";
