// @ts-nocheck
import React from "react";
import { theme } from "../../theme";

const BorderRadiusStories = {
    title: "Configuration/Border Radius",
};

const { borderRadius } = theme;

export const BorderRadius = () => {
    const keys = Object.keys(borderRadius);

    return (
        <div className="space-y-4">
            {keys.map((key) => {
                const name = key === "DEFAULT" ? "" : `-${key}`;
                return (
                    <div key={key} className="flex flex-row items-center font-mono text-sm">
                        <span className="mr-1 min-w-24 shrink-0 text-gray-darker">
                            rounded
                            {name}
                        </span>
                        <div
                            key={key}
                            className="ml-2 flex h-10 w-72 items-center bg-blue-lighter pl-3"
                            style={{ borderRadius: borderRadius[key] }}
                        >
                            border-radius: &quot;{borderRadius[key]}&quot;
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default BorderRadiusStories;
