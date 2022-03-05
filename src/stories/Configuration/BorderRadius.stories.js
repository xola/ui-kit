import clsx from "clsx";
import React from "react";
import twConfig from "../../../tailwind.config";

const BorderRadiusStories = {
    title: "Configuration/Border Radius",
};

const borderRadius = twConfig.theme.borderRadius;

export const BorderRadius = () => {
    const keys = Object.keys(borderRadius);

    return (
        <div className="space-y-4">
            {keys.map((key) => {
                const name = key === "DEFAULT" ? "" : `-${key}`;
                const brClassName = `rounded${name}`;
                return (
                    <div key={key} className="flex flex-row items-center font-mono text-sm">
                        <span className="mr-1 min-w-24 shrink-0 text-gray-darker">rounded{name}</span>
                        <div
                            key={key}
                            className={clsx("ml-2 flex h-10 w-72 items-center bg-blue-lighter pl-3", brClassName)}
                        >
                            border-radius: "{borderRadius[key]}"
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default BorderRadiusStories;
