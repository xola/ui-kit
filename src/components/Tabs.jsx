import React, { createElement, Children, cloneElement } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

export const Tabs = ({ className, children, value, onChange, ...rest }) => {
    const childrenArray = Children.toArray(children);
    const tabs = childrenArray.filter((child) => child.type === Tabs.Tab); // Checking it with Tabs.Tab causes propType validation to fial
    const panels = childrenArray.filter((child) => child.type === Tabs.Panel); // Same as above

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

Tabs.propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};

Tabs.Tab = ({ className, active = false, as = "button", ...rest }) => {
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

Tabs.Tab.propTypes = {
    className: PropTypes.string,
    active: PropTypes.bool,
    as: PropTypes.string,
};

Tabs.Panel = ({ active = false, className, ...rest }) => {
    return <div className={clsx(className, active || "hidden")} {...rest} />;
};

Tabs.Panel.displayName = "Tabs.Panel";

Tabs.Panel.propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
};
