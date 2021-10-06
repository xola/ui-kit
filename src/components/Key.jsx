import clsx from "clsx";
import React from "react";
import PropTypes from "prop-types";
import { isOSX } from "../helpers/browser";

export const Key = ({ char, className, ...rest }) => {
    const key = keyMap[char] ?? char;

    return (
        <div
            className={clsx(
                "ui-key",
                "inline-flex items-center justify-center h-5 py-1 px-2 bg-gray-lighter text-xs text-gray font-semibold rounded",
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
    ctrl: isOSX ? "ctrl" : "alt",
    up: "↑",
    down: "↓",
};

Key.propTypes = {
    char: PropTypes.string.isRequired,
    className: PropTypes.string,
};
