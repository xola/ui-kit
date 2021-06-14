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
                            isActive: index === value,
                            onClick: () => onChange?.(index),
                        });
                    })}
                </nav>
            </div>

            {panels.map((child, index) => {
                return cloneElement(child, { isActive: index === value });
            })}
        </>
    );
};

Tabs.propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};

const Tab = ({ className, isActive = false, as = "button", ...rest }) => {
    return createElement(as, {
        className: clsx(
            className,
            "transition-colors cursor-pointer p-4 flex-1 text-center text-lg font-semibold whitespace-nowrap focus-visible:ring",
            isActive ? "bg-white text-black" : "text-gray-dark hover:text-black hover:bg-gray-light",
        ),
        ...rest,
    });
};

Tab.displayName = "Tabs.Tab";
Tab.propTypes = {
    className: PropTypes.string,
    isActive: PropTypes.bool,
    as: PropTypes.string,
};
Tabs.Tab = Tab;

const Panel = ({ isActive = false, className, ...rest }) => {
    return <div className={clsx(className, isActive || "hidden")} {...rest} />;
};

Panel.displayName = "Tabs.Panel";
Panel.propTypes = {
    isActive: PropTypes.bool,
    className: PropTypes.string,
};
Tabs.Panel = Panel;
