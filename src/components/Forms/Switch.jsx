import { Switch as HeadlessSwitch } from "@headlessui/react";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

const sizes = {
    large: {
        parent: "h-6 w-11",
        inner: "h-5 w-5",
        translate: "translate-x-5",
    },
    medium: {
        parent: "h-5 w-8",
        inner: "h-4 w-4",
        translate: "translate-x-3",
    },
    small: {
        parent: "h-3 w-5",
        inner: "h-2 w-2",
        translate: "translate-x-2",
    },
};

// TODO: Native checkbox input `checked` and `disabled` properties are not prefixed with `is`.
// Decide on the naming convention.
export const Switch = ({ isChecked = false, size = "medium", ...rest }) => {
    return (
        <HeadlessSwitch
            checked={isChecked}
            className={clsx(
                "ui-switch",
                isChecked ? "bg-primary disabled:bg-gray-light" : "bg-gray disabled:bg-gray-light",
                "switch relative inline-flex flex-shrink-0 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none",
                sizes[size].parent,
            )}
            {...rest}
        >
            <span
                className={clsx(
                    isChecked ? sizes[size].translate : "translate-x-0",
                    "switch-inner pointer-events-none inline-block rounded-full bg-white transform ring-0 transition ease-in-out duration-200 shadow",
                    sizes[size].inner,
                )}
            />
        </HeadlessSwitch>
    );
};

Switch.propTypes = {
    isChecked: PropTypes.bool,
    size: PropTypes.string,
};

Switch.Group = ({ className, children }) => {
    return (
        <HeadlessSwitch.Group as="div" className={clsx("ui-switch-group", "inline-flex items-center", className)}>
            {children}
        </HeadlessSwitch.Group>
    );
};

Switch.Group.displayName = "Switch.Group";

Switch.Group.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

Switch.Label = ({ direction = "left", className, children }) => {
    return (
        <HeadlessSwitch.Label
            as="span"
            className={clsx("ui-switch-label", "cursor-pointer", direction === "left" ? "mr-2" : "ml-2", className)}
        >
            {children}
        </HeadlessSwitch.Label>
    );
};

Switch.Label.displayName = "Switch.Label";

Switch.Label.propTypes = {
    direction: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};
