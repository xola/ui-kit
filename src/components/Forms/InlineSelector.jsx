import clsx from "clsx";
import React from "react";
import { Popover } from "../Popover/Popover";

export const InlineSelector = ({ text = "Specify text prop", isOpen = false, onClick, className, children }) => {
    return (
        <Popover visible={isOpen}>
            <span className="font-bold border-b cursor-pointer text-primary border-primary" onClick={onClick}>
                {text}
            </span>
            <Popover.Content>
                <div className={clsx("p-2 pb-0", className)}>{children}</div>
            </Popover.Content>
        </Popover>
    );
};
