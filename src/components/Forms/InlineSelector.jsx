import clsx from "clsx";
import React from "react";
import { Popover } from "../Popover/Popover";

export const InlineSelector = ({ text = "Specify text prop", isOpen = false, onClick, className, children }) => {
    return (
        <Popover visible={isOpen}>
            <span onClick={onClick} className="font-bold text-primary border-b border-primary cursor-pointer">
                {text}
            </span>
            <Popover.Content>
                <div className={clsx("p-2 pb-0", className)}>{children}</div>
            </Popover.Content>
        </Popover>
    );
};
