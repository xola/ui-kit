import clsx from "clsx";
import { useState } from "react";
import { Switch as HeadlessSwitch } from "@headlessui/react";

const parent = {
    medium: "h-6 w-11",
    small: "h-5 w-9",
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
                    enabled ? "translate-x-4" : "translate-x-0",
                    "pointer-events-none inline-block rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200",
                    inner[size],
                )}
            />
        </HeadlessSwitch>
    );
};
