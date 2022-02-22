import clsx from "clsx";
import PropTypes from "prop-types";
import React, { Children, cloneElement } from "react";
import { Panel } from "./Tabs.Panel";
import { Tab } from "./Tabs.Tab";

const variants = {
    default: "border-t border-gray-light",
    simple: "bg-gray-lighter",
};

export const Tabs = ({ className, variant = "default", value, onChange, children, ...rest }) => {
    const childrenArray = Children.toArray(children);
    const tabs = childrenArray.filter((child) => child.type === Tabs.Tab);
    const panels = childrenArray.filter((child) => child.type === Tabs.Panel);

    return (
        <>
            <nav className={clsx("ui-tabs", "flex overflow-x-auto", variants[variant], className)} {...rest}>
                {variant === "default" ? (
                    <div className="min-w-[40px] flex-shrink-0 border-b border-gray-light" />
                ) : null}

                {tabs.map((child, index) => {
                    return cloneElement(child, {
                        variant,
                        isActive: index === value,
                        onClick: () => onChange?.(index),
                    });
                })}

                {variant === "default" ? <div className="min-w-[40px] flex-grow border-b border-gray-light" /> : null}
            </nav>

            {panels[value]}
        </>
    );
};

Tabs.propTypes = {
    variant: PropTypes.oneOf(Object.keys(variants)),
    className: PropTypes.string,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

Tabs.Tab = Tab;
Tabs.Panel = Panel;
