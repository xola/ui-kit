import clsx from "clsx";
import React, { Children, cloneElement, type ReactElement } from "react";
import { Panel, type PanelProps } from "./Tabs.Panel";
import { Tab, type TabProps } from "./Tabs.Tab";

const variants = {
    default: "border-t border-gray-light",
    simple: "bg-gray-lighter",
} as const;

type TabsVariant = keyof typeof variants;

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
    readonly variant?: TabsVariant;
    value: number;
    children: React.ReactNode;
    readonly className?: string;
    onChange: (index: number) => void;
}

export const Tabs = ({ variant = "default", value, children, className, onChange, ...rest }: TabsProps) => {
    const childrenArray = Children.toArray(children);
    const tabs = childrenArray.filter((child): child is ReactElement<TabProps> => {
        return React.isValidElement(child) && child.type === Tab;
    });
    const panels = childrenArray.filter((child): child is ReactElement<PanelProps> => {
        return React.isValidElement(child) && child.type === Panel;
    });

    return (
        <>
            <nav className={clsx("ui-tabs", "flex overflow-x-auto", variants[variant], className)} {...rest}>
                {variant === "default" ? <div className="min-w-10 flex-shrink-0 border-b border-gray-light" /> : null}

                {tabs.map((child, index) => {
                    return cloneElement<any>(child, {
                        variant,
                        isActive: index === value,
                        onClick: () => onChange(index),
                    });
                })}

                {variant === "default" ? <div className="min-w-10 flex-grow border-b border-gray-light" /> : null}
            </nav>

            {panels[value]}
        </>
    );
};

Tabs.Tab = Tab;
Tabs.Panel = Panel;
