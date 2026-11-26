import { Field, Switch as HeadlessSwitch, Label } from "@headlessui/react";
import PropTypes from "prop-types";
import React, { createContext, useContext, useEffect, useState } from "react";
import cn from "../../helpers/classnames";

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

/**
 * Headless UI's `Label` finds its switch with `document.getElementById` on the `Field`'s generated control id. A
 * consumer `id` on the switch replaces that id, so the group hands the consumer id to the label instead.
 */
const SwitchGroupContext = createContext({});

// TODO: Native checkbox input `checked` and `disabled` properties are not prefixed with `is`.
// Decide on the naming convention.
export const Switch = ({ id, isChecked = false, size = "medium", ...rest }) => {
    const { setSwitchId } = useContext(SwitchGroupContext);

    useEffect(() => {
        setSwitchId?.(id);
        return () => setSwitchId?.(undefined);
    }, [id, setSwitchId]);

    const { parent, inner, translate } = sizes[size];

    return (
        <HeadlessSwitch
            id={id}
            checked={isChecked}
            className={cn(
                "ui-switch",
                isChecked ? "bg-primary disabled:bg-gray-light" : "bg-gray disabled:bg-gray-light",
                "relative inline-flex flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                parent,
            )}
            {...rest}
        >
            <span
                className={cn(
                    isChecked ? translate : "translate-x-0",
                    "ui-switch-inner pointer-events-none inline-block transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                    inner,
                )}
            />
        </HeadlessSwitch>
    );
};

Switch.propTypes = {
    id: PropTypes.string,
    isChecked: PropTypes.bool,
    size: PropTypes.string,
};

const SwitchGroup = ({ className, children }) => {
    const [switchId, setSwitchId] = useState();

    return (
        <SwitchGroupContext.Provider value={{ switchId, setSwitchId }}>
            <Field className={cn("ui-switch-group", "inline-flex items-center", className)}>{children}</Field>
        </SwitchGroupContext.Provider>
    );
};

SwitchGroup.displayName = "Switch.Group";

SwitchGroup.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

Switch.Group = SwitchGroup;

const SwitchLabel = ({ direction = "left", className, children }) => {
    const { switchId } = useContext(SwitchGroupContext);

    return (
        <Label
            htmlFor={switchId}
            className={cn("ui-switch-label", "cursor-pointer", direction === "left" ? "mr-2" : "ml-2", className)}
        >
            {children}
        </Label>
    );
};

SwitchLabel.displayName = "Switch.Label";

SwitchLabel.propTypes = {
    direction: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

Switch.Label = SwitchLabel;
