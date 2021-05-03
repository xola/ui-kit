import React, { createElement, Children, cloneElement } from "react";
import clsx from "clsx";

// TODO: Define sizes.

export const Tabs = ({ className, children, value, onChange, ...rest }) => {
    return (
        <div className={clsx("overflow-x-auto", className)} {...rest}>
            <nav className="flex">
                {Children.map(children, (child, index) => {
                    return cloneElement(child, {
                        active: index === value,
                        onClick: () => onChange?.(index),
                    });
                })}
            </nav>
        </div>
    );
};

Tabs.Tab = ({ className, active, as = "button", ...rest }) => {
    return createElement(as, {
        className: clsx(
            className,
            "cursor-pointer py-3 w-full text-center text-base whitespace-nowrap font-bold border-b transition-colors",
            active
                ? "border-primary text-black"
                : "border-gray-light text-gray-dark hover:text-gray-darker hover:border-gray",
        ),
        ...rest,
    });
};

Tabs.Tab.displayName = "Tabs.Tab";
