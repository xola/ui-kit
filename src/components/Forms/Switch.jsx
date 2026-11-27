import * as RadixLabel from "@radix-ui/react-label";
import * as RadixSwitch from "@radix-ui/react-switch";
import PropTypes from "prop-types";
import React, { Children, createContext, isValidElement, useContext, useEffect, useId, useState } from "react";
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
 * Radix has no group or label parts, so `Switch.Group` generates the switch id and shares it here. A consumer
 * `id` on the switch replaces the generated one, which is what the label's `htmlFor` points at.
 */
const SwitchGroupContext = createContext({});

/** Headless UI's label ignored clicks on interactive descendants, so their native action survived. */
const INTERACTIVE_CHILD_SELECTOR =
    'a[href],audio[controls],button,details,embed,iframe,img[usemap],input:not([type="hidden"]),label,select,textarea,video[controls]';

const getDirectSwitchId = (children) => {
    const switchChild = Children.toArray(children).find((child) => isValidElement(child) && child.type === Switch);

    return switchChild?.props.id;
};

/**
 * Submits the enclosing form, preferring its first submit button, like the Headless UI switch that used Enter
 * for form submission instead of toggling.
 */
const attemptSubmit = (element) => {
    const form = element.form ?? element.closest("form");
    if (!form) return;

    for (const control of form.elements) {
        const isSubmitControl =
            (control.tagName === "INPUT" && ["submit", "image"].includes(control.type)) ||
            (control.tagName === "BUTTON" && control.type === "submit");
        if (control !== element && isSubmitControl) {
            control.click();
            return;
        }
    }

    form.requestSubmit?.();
};

// TODO: Native checkbox input `checked` and `disabled` properties are not prefixed with `is`.
// Decide on the naming convention.
export const Switch = ({ id, isChecked = false, size = "medium", onChange, onKeyDown, onKeyUp, ...rest }) => {
    const { switchId, setSwitchId } = useContext(SwitchGroupContext);

    useEffect(() => {
        setSwitchId?.(id);
        return () => setSwitchId?.(undefined);
    }, [id, setSwitchId]);

    const { parent, inner, translate } = sizes[size];

    const handleKeyDown = (event) => {
        onKeyDown?.(event);
        // The ARIA switch pattern makes Enter optional; Headless UI left Enter for form submission, so keep
        // suppressing Radix's native Enter activation of the underlying button.
        if (!event.defaultPrevented && event.key === "Enter") event.preventDefault();
    };

    const handleKeyUp = (event) => {
        onKeyUp?.(event);
        if (!event.defaultPrevented && event.key === "Enter") attemptSubmit(event.currentTarget);
    };

    return (
        <RadixSwitch.Root
            id={id ?? switchId}
            checked={isChecked}
            onCheckedChange={onChange}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
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
        </RadixSwitch.Root>
    );
};

Switch.propTypes = {
    id: PropTypes.string,
    isChecked: PropTypes.bool,
    size: PropTypes.string,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
};

const SwitchGroup = ({ className, children }) => {
    const generatedId = useId();
    const [reportedId, setReportedId] = useState();

    // A direct Switch child's id is visible at render time, so the label points at it from the very first
    // commit; the reported id below still covers a switch nested deeper in the group.
    const switchId = getDirectSwitchId(children) ?? reportedId ?? generatedId;

    return (
        <SwitchGroupContext.Provider value={{ switchId, setSwitchId: setReportedId }}>
            <div className={cn("ui-switch-group", "inline-flex items-center", className)}>{children}</div>
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

    // A native label click does not reliably focus a button, so suppress the native activation and click and
    // focus the switch explicitly, like the previous Headless UI label did. Clicks on interactive descendants
    // (a link inside the label) keep their native action instead: the HTML spec makes label activation do
    // nothing for them, so simply stay out of the way.
    const handleClick = (event) => {
        const interactiveAncestor =
            event.target instanceof Element ? event.target.closest(INTERACTIVE_CHILD_SELECTOR) : undefined;
        if (interactiveAncestor && interactiveAncestor !== event.currentTarget) return;
        event.preventDefault();
        const switchElement = document.getElementById(switchId);
        switchElement?.click();
        switchElement?.focus({ preventScroll: true });
    };

    return (
        <RadixLabel.Root
            htmlFor={switchId}
            onClick={handleClick}
            className={cn("ui-switch-label", "cursor-pointer", direction === "left" ? "mr-2" : "ml-2", className)}
        >
            {children}
        </RadixLabel.Root>
    );
};

SwitchLabel.displayName = "Switch.Label";

SwitchLabel.propTypes = {
    direction: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

Switch.Label = SwitchLabel;
