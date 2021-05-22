import clsx from "clsx";
import React from "react";
import { isOSX } from '../helpers/browser';

export const Key = ({ char, className, ...rest }) => {
    char = getRealKey(char);
    return (
        <div
            className={clsx(
                "inline-flex items-center justify-center h-5 py-1 px-2 bg-gray-lighter text-xs text-gray font-semibold rounded",
                char.length === 1 ? "w-5" : "",
                className,
            )}
            {...rest}
        >
            {char}
        </div>
    );
};

/**
 * Since initial devs are Mac based, we define the shortcuts in Mac and translate them to windows
 */
const getRealKey = (char) => {
    switch (char) {
        case "cmd":
            return isOSX ? "⌘" : "ctrl";
        case "option":
            return isOSX ? "⌥" : "win";
        case "ctrl":
            return isOSX ? "ctrl" : "alt";
        case "up":
            return "↑";
        case "down":
            return "↓";
        default:
            return char;
    }
};
