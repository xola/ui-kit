import clsx from "clsx";
import React from "react";
import { isOSX } from "../helpers/browser";

const keyMap: Record<string, string> = {
    cmd: isOSX ? "⌘" : "ctrl",
    option: isOSX ? "⌥" : "win",
    ctrl: isOSX ? "ctrl" : "ctrl",
    up: "↑",
    down: "↓",
};

export interface KeyProps extends React.HTMLAttributes<HTMLDivElement> {
    char: string;
    className?: string;
}

export const Key = ({ char, className, ...rest }: KeyProps) => {
    const key = keyMap[char] ?? char;

    return (
        <div
            className={clsx(
                "ui-key",
                "no-translate inline-flex h-5 items-center justify-center rounded bg-gray-lighter px-2 py-1 text-xs font-semibold text-gray",
                key.length === 1 && "w-5",
                className,
            )}
            {...rest}
        >
            {key}
        </div>
    );
};
