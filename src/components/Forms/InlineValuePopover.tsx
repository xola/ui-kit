import clsx from "clsx";
import React, { useRef } from "react";
import { DownArrowIcon } from "../..";
import { Popover } from "../Popover/Popover";
import { ValuePopoverText } from "./ValuePopoverText";

export interface InlineValuePopoverProps {
    readonly text?: React.ReactNode;
    readonly isOpen?: boolean;
    readonly showArrow?: boolean;
    readonly autoSelectOnClick?: boolean;
    readonly children?: React.ReactNode;
    readonly error?: React.ReactNode | null;
    readonly classNames?: {
        text?: string;
        textField?: string;
        children?: string;
    };
    readonly onClick?: (e: React.MouseEvent) => void;
    readonly onClickOutside?: () => void;
}

export const InlineValuePopover = ({
    text,
    isOpen = false,
    showArrow = true,
    autoSelectOnClick = false,
    children,
    error = null,
    classNames,
    onClick,
    onClickOutside,
    ...rest
}: InlineValuePopoverProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const handleClick = (e: React.MouseEvent) => {
        setTimeout(() => {
            // This may technically belong in Seller app, but the most common use case for this component here is
            // to use inputs, so we'll provide some helpers for that
            const popoverInput = ref?.current?.querySelector("select,textarea,input") as HTMLInputElement | null;
            if (!popoverInput) return;

            popoverInput.focus();

            if (autoSelectOnClick) {
                popoverInput.select();
            }
        }, 0);
        onClick?.(e);
    };

    return (
        <Popover visible={isOpen} className="" onClickOutside={onClickOutside} {...rest}>
            <span
                className={clsx(
                    "cursor-pointer whitespace-nowrap",
                    error && "!border-danger !text-danger",
                    classNames?.text,
                )}
                onClick={handleClick}
            >
                <span className={clsx("border-b border-b-black font-bold text-black", classNames?.textField)}>
                    <ValuePopoverText value={text} error={error} />
                </span>
                {showArrow && <DownArrowIcon size="medium" />}
            </span>

            <Popover.Content>
                <div ref={ref} className={clsx("p-2", classNames?.children)}>
                    {children}
                </div>
            </Popover.Content>
        </Popover>
    );
};
