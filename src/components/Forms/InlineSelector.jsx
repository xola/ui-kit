import clsx from "clsx";
import React from "react";
import { Popover } from "../Popover/Popover";

export const InlineSelector = ({ text = "Specify text prop", isOpen = false, onClick, classNames, children }) => {
    return (
        <Popover visible={isOpen}>
            <span
                className={clsx("font-bold border-b cursor-pointer border-primary", classNames?.text)}
                onClick={onClick}
            >
                {text}
            </span>
            <Popover.Content>
                <div className={clsx("p-2 pb-0", classNames?.children)}>{children}</div>
            </Popover.Content>
        </Popover>
    );
};
