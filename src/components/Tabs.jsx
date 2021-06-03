import React, { createElement, Children, cloneElement } from "react";
import clsx from "clsx";

export const Tabs = ({ className, children, value, onChange, ...rest }) => {
    const childrenArray = Children.toArray(children);
    const tabs = childrenArray.filter((child) => child.type === Tabs.Tab);
    const panels = childrenArray.filter((child) => child.type === Tabs.Panel);

    return (
        <>
            <div className={clsx("bg-gray-lighter overflow-x-auto", className)} {...rest}>
                <nav className="flex">
                    {tabs.map((child, index) => {
                        return cloneElement(child, {
                            active: index === value,
                            onClick: () => onChange?.(index),
                        });
                    })}
                </nav>
            </div>

            {panels.map((child, index) => {
                return cloneElement(child, { active: index === value });
            })}
        </>
    );
};

Tabs.Tab = ({ className, active, as = "button", ...rest }) => {
    return createElement(as, {
        className: clsx(
            className,
            "transition-colors cursor-pointer p-4 flex-1 text-center text-lg font-semibold whitespace-nowrap focus-visible:ring",
            active ? "bg-white text-black" : "text-gray-dark hover:text-black hover:bg-gray-light",
        ),
        ...rest,
    });
};

Tabs.Tab.displayName = "Tabs.Tab";

Tabs.Panel = ({ active, className, ...rest }) => {
    return <div className={clsx(className, active || "hidden")} {...rest} />;
};

Tabs.Panel.displayName = "Tabs.Panel";
