import { Switch as HeadlessSwitch } from "@headlessui/react";
import clsx from "clsx";
import React, { useState } from "react";

const parent = {
    medium: "h-6 w-11",
    small: "h-5 w-10",
};

const inner = {
    medium: "h-5 w-5",
    small: "h-4 w-4",
};

export const Switch = ({ size = "medium" }) => {
    const [enabled, setEnabled] = useState(false);

    return (
        <HeadlessSwitch
            checked={enabled}
            onChange={setEnabled}
            className={clsx(
                enabled ? "bg-primary" : "bg-gray",
                "relative inline-flex flex-shrink-0 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
                parent[size],
            )}
        >
            <span
                className={clsx(
                    enabled ? "translate-x-5" : "translate-x-0",
                    "pointer-events-none inline-block rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200",
                    inner[size],
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
