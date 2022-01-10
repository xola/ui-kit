import clsx from "clsx";
import PropTypes from "prop-types";
import React, { Children, cloneElement } from "react";
import { Panel } from "./Tabs.Panel";
import { Tab } from "./Tabs.Tab";

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

Tabs.Tab = Tab;
Tabs.Panel = Panel;
