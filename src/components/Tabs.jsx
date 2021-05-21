import React, { createElement, Children, cloneElement } from "react";
import clsx from "clsx";

export const Tabs = ({ className, children, value, onChange, ...rest }) => {
    return (
        <div className={clsx("bg-gray-lighter", className)} {...rest}>
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
            "cursor-pointer h-15 w-full text-center text-lg font-semibold whitespace-nowrap",
            active ? "bg-white text-black" : "text-gray-dark hover:text-black hover:bg-gray-light",
        ),
        ...rest,
    });
};

Tabs.Tab.displayName = "Tabs.Tab";
