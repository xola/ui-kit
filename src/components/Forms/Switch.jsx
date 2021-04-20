import clsx from "clsx";
import { useState } from "react";
import { Switch as HeadlessSwitch } from "@headlessui/react";

export const Switch = () => {
    const [enabled, setEnabled] = useState(false);

    return (
        <HeadlessSwitch
            checked={enabled}
            onChange={setEnabled}
            className={clsx(
                enabled ? "bg-primary" : "bg-gray",
                "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
            )}
        >
            <span
                className={clsx(
                    enabled ? "translate-x-5" : "translate-x-0",
                    "pointer-events-none inline-block h-[1.20rem] w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200",
                )}
            />
        </HeadlessSwitch>
    );
};
