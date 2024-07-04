import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { isOSX } from "../helpers/browser";

export const Key = ({ char, className, ...rest }) => {
    const key = keyMap[char] ?? char;

    return (
        <div
            className={clsx(
                "ui-key",
                "inline-flex h-5 items-center justify-center rounded bg-gray-lighter py-1 px-2 text-xs font-semibold text-gray",
                key.length === 1 && "w-5",
                className,
            )}
            {...rest}
        >
            {key}
        </div>
    );
};

/**
 * Since initial devs are Mac based, we define the shortcuts in Mac and translate them to windows
 */
const keyMap = {
    cmd: isOSX ? "⌘" : "ctrl",
    option: isOSX ? "⌥" : "win",
    ctrl: isOSX ? "ctrl" : "ctrl",
    up: "↑",
    down: "↓",
};

Key.propTypes = {
    char: PropTypes.string.isRequired,
    className: PropTypes.string,
};
