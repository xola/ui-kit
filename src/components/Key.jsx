import clsx from "clsx";
import React from "react";

const isOSX = navigator.userAgent.includes("Macintosh");

export const Key = ({ char, ...rest }) => {
    char = char === "cmd" ? (isOSX ? "⌘" : "ctrl") : char;
    const multiChar = char.length > 1 ? "px-4" : "";
    return (
        <div
            className={clsx(
                "inline-flex items-center justify-center h-5 w-5 bg-gray-lighter text-xs text-gray font-semibold p-2 rounded",
                multiChar,
            )}
        >
            {char}
        </div>
    );
};
