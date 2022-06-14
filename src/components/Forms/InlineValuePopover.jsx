import clsx from "clsx";
import React from "react";
import { Popover } from "../Popover/Popover";
import { DownArrowIcon } from "../..";

export const InlineValuePopover = ({
    text,
    isOpen = false,
    showArrow = false,
    onClick,
    onClickOutside,
    classNames,
    children,
    ...rest
}) => {
    return (
        <Popover visible={isOpen} onClickOutside={onClickOutside} {...rest}>
            <span className={clsx("cursor-pointer", classNames?.text)} onClick={onClick}>
                <span className="border-b border-primary font-bold">{text}</span>
                {showArrow ? <DownArrowIcon size="medium" /> : ""}
            </span>

            <Popover.Content>
                <div className={clsx("p-2", classNames?.children)}>{children}</div>
            </Popover.Content>
        </Popover>
    );
};
