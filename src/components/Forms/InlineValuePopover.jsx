import clsx from "clsx";
import React from "react";
import { Popover } from "../Popover/Popover";

export const InlineValuePopover = ({
    text,
    isOpen = false,
    onClick,
    onClickOutside,
    classNames,
    children,
    ...rest
}) => {
    return (
        <Popover visible={isOpen} onClickOutside={onClickOutside} {...rest}>
            <span
                className={clsx("cursor-pointer border-b border-primary font-bold", classNames?.text)}
                onClick={onClick}
            >
                {text}
            </span>
            <Popover.Content>
                <div className={clsx("p-2", classNames?.children)}>{children}</div>
            </Popover.Content>
        </Popover>
    );
};
