import { Switch as HeadlessSwitch } from "@headlessui/react";
import clsx from "clsx";
import { noop } from "lodash-es";
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
} as const;

type SwitchSize = keyof typeof sizes;

export interface SwitchProps {
    isChecked?: boolean;
    size?: SwitchSize;
    disabled?: boolean;
    className?: string;
    onChange?: (checked: boolean) => void;
}

const SwitchComponent = ({ isChecked = false, size = "medium", disabled, className, onChange }: SwitchProps) => {
    return (
        <HeadlessSwitch
            checked={isChecked}
            disabled={disabled}
            className={clsx(
                "ui-switch",
                isChecked ? "bg-primary disabled:bg-gray-light" : "bg-gray disabled:bg-gray-light",
                "relative inline-flex flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                sizes[size].parent,
                className,
            )}
            onChange={onChange ?? noop}
        >
            <span
                className={clsx(
                    isChecked ? sizes[size].translate : "translate-x-0",
                    "ui-switch-inner pointer-events-none inline-block transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                    sizes[size].inner,
                )}
            />
        </HeadlessSwitch>
    );
};

export interface SwitchGroupProps {
    className?: string;
    children: React.ReactNode;
}

const SwitchGroup = ({ children, className }: SwitchGroupProps) => {
    return (
        <HeadlessSwitch.Group as="div" className={clsx("ui-switch-group", "inline-flex items-center", className)}>
            {children}
        </HeadlessSwitch.Group>
    );
};

SwitchGroup.displayName = "Switch.Group";

export interface SwitchLabelProps {
    direction?: "left" | "right";
    className?: string;
    children: React.ReactNode;
}

const SwitchLabel = ({ direction = "left", children, className }: SwitchLabelProps) => {
    return (
        <HeadlessSwitch.Label
            as="span"
            className={clsx("ui-switch-label", "cursor-pointer", direction === "left" ? "mr-2" : "ml-2", className)}
        >
            {children}
        </HeadlessSwitch.Label>
    );
};

SwitchLabel.displayName = "Switch.Label";

export const Switch = Object.assign(SwitchComponent, {
    Group: SwitchGroup,
    Label: SwitchLabel,
});
