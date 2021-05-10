import { Switch as HeadlessSwitch } from "@headlessui/react";
import clsx from "clsx";
import React, { useState } from "react";

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

export const Switch = ({ checked = true, size = "medium", ...rest }) => {
    const [enabled, setEnabled] = useState(checked);
    if (checked !== enabled) {
        setEnabled(checked);
    }

    return (
        <HeadlessSwitch
            checked={enabled}
            onChange={setEnabled}
            className={clsx(
                enabled ? "bg-primary" : "bg-gray",
                "switch relative inline-flex flex-shrink-0 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none",
                sizes[size].parent,
            )}
            {...rest}
        >
            <span
                className={clsx(
                    enabled ? sizes[size].translate : "translate-x-0",
                    "switch-inner pointer-events-none inline-block rounded-full bg-white transform ring-0 transition ease-in-out duration-200",
                    sizes[size].inner,
                )}
            />
        </HeadlessSwitch>
    );
};

Switch.Group = ({ className, children }) => {
    return (
        <HeadlessSwitch.Group as="div" className={clsx("inline-flex items-center", className)}>
            {children}
        </HeadlessSwitch.Group>
    );
};

Switch.Label = ({ direction = "left", className, children }) => {
    return (
        <HeadlessSwitch.Label as="span" className={clsx(direction === "left" ? "mr-2" : "ml-2", className)}>
            {children}
        </HeadlessSwitch.Label>
    );
};
