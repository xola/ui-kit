import type { ComponentPropsWithoutRef } from "react";
import cn from "../helpers/classnames";
import { isOSX } from "../helpers/browser";

interface KeyProps extends ComponentPropsWithoutRef<"div"> {
    char: string;
}

export const Key = ({ char, className, ...rest }: KeyProps) => {
    const key = keyMap[char] ?? char;

    return (
        <div
            className={cn(
                "ui-key",
                "no-translate inline-flex h-5 items-center justify-center rounded bg-gray-lighter py-1 px-2 text-xs font-semibold text-gray",
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
const keyMap: Record<string, string> = {
    cmd: isOSX ? "⌘" : "ctrl",
    option: isOSX ? "⌥" : "win",
    ctrl: isOSX ? "ctrl" : "ctrl",
    up: "↑",
    down: "↓",
};
