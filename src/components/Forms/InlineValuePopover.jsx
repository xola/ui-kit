import clsx from "clsx";
import React from "react";
import { Popover } from "../Popover/Popover";
import { DownArrowIcon } from "../..";

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
            <div className="flex flex-row items-center" onClick={onClick}>
                <span className={clsx("cursor-pointer border-b border-primary font-bold", classNames?.text)}>
                    {text}
                </span>
                <div className="flex items-center pr-3">
                    <DownArrowIcon className="inline-block" size="medium" />
                </div>
            </div>

            <Popover.Content>
                <div className={clsx("p-2", classNames?.children)}>{children}</div>
            </Popover.Content>
        </Popover>
    );
};
