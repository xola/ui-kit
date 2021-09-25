import clsx from "clsx";
import PropTypes from "prop-types";
import React, { Children, cloneElement } from "react";

export const Tabs = ({ className, value, onChange, children, ...rest }) => {
    const childrenArray = Children.toArray(children);
    const tabs = childrenArray.filter((child) => child.type === Tabs.Tab);
    const panels = childrenArray.filter((child) => child.type === Tabs.Panel);

    return (
        <>
            <div className={clsx("ui-tabs", "bg-gray-lighter overflow-x-auto", className)} {...rest}>
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
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

const Tab = ({ as: Tag = "button", className, isActive = false, ...rest }) => {
    return (
        <Tag
            className={clsx(
                "ui-tabs-tab",
                className,
                "transition-colors cursor-pointer p-4 flex-1 text-center text-lg font-semibold whitespace-nowrap focus-visible:ring",
                isActive ? "bg-white text-black" : "text-gray-dark hover:text-black hover:bg-gray-light",
            )}
            {...rest}
        />
    );
};

Tab.displayName = "Tabs.Tab";
Tab.propTypes = {
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
    className: PropTypes.string,
    isActive: PropTypes.bool,
};
Tabs.Tab = Tab;

const Panel = ({ isActive = false, className, ...rest }) => {
    return <div className={clsx("ui-tabs-panel", className, isActive || "hidden")} {...rest} />;
};

Panel.displayName = "Tabs.Panel";
Panel.propTypes = {
    isActive: PropTypes.bool,
    className: PropTypes.string,
};
Tabs.Panel = Panel;
