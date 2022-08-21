import clsx from "clsx";
import React, { useRef } from "react";
import { DownArrowIcon } from "../..";
import { Popover } from "../Popover/Popover";

export const InlineValuePopover = ({
    text,
    isOpen = false,
    showArrow = true,
    onClick,
    onClickOutside,
    classNames,
    children,
    ...rest
}) => {
    const ref = useRef();
    const handleClick = () => {
        setTimeout(() => {
            ref?.current.querySelector("input").focus();
        }, 0);
        onClick?.();
    };

    return (
        <Popover visible={isOpen} onClickOutside={onClickOutside} {...rest}>
            <span className={clsx("cursor-pointer", classNames?.text)} onClick={handleClick}>
                <span className="border-b border-b-black font-bold text-black">{text}</span>
                {showArrow ? <DownArrowIcon size="medium" /> : ""}
            </span>

            <Popover.Content>
                <div ref={ref} className={clsx("p-2", classNames?.children)}>
                    {children}
                </div>
            </Popover.Content>
        </Popover>
    );
};
