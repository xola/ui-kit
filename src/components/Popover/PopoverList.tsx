import { type TippyProps } from "@tippyjs/react";
import clsx from "clsx";
import React, { Children, ReactElement } from "react";
import { Popover, type PopoverProps } from "./Popover";
import scrollFix from "./PopoverScroll.module.css";

export interface PopoverListProps extends Omit<Partial<PopoverProps>, "placement" | "children" | "className"> {
    readonly placement?: TippyProps["placement"];
    children: React.ReactNode;
    readonly className?: string;
}

export const PopoverList = ({ placement = "bottom", children, className, ...rest }: PopoverListProps) => {
    const childrenArray = Children.toArray(children);
    const innerContent = childrenArray.filter((child: any) => child.type !== Item);
    const totalItems = childrenArray.length - innerContent.length;
    const items = childrenArray.map((child: any, position) => {
        return child.type === Item ? React.cloneElement(child, { position, total: totalItems }) : null;
    });

    const content = (
        <Popover.Content
            className={clsx(scrollFix, "ui-popover-list-content divide-y divide-solid divide-gray-lighter p-0 ")}
        >
            {items}
        </Popover.Content>
    );

    return (
        <Popover
            content={content}
            placement={placement}
            className={clsx("ui-popover-list", "w-40", className)}
            {...rest}
        >
            {innerContent}
        </Popover>
    );
};

export interface PopoverListItemProps {
    name: string;
    readonly isActive?: boolean;
    readonly id?: string | null;
    readonly position?: number;
    readonly total?: number;
    children: React.ReactNode;
    readonly className?: string;
    onClickItem: (event: React.MouseEvent<HTMLDivElement>, name: string, id: string | null) => void;
}

const Item = ({
    name,
    isActive = false,
    id = null,
    position,
    total,
    children,
    className,
    onClickItem,
    ...rest
}: PopoverListItemProps) => {
    const onClick = (event: React.MouseEvent<HTMLDivElement>) => onClickItem(event, name, id);

    return (
        <div
            className={clsx(
                "ui-popover-list-item",
                "flex cursor-pointer space-x-2.5 p-4 align-text-top font-semibold leading-4 tracking-tightest hover:bg-gray-lighter",
                isActive ? "bg-gray-lighter" : null,
                position === 1 ? "rounded-t-lg" : null, // Round the top left & right corners if it's the first one
                position === total ? "rounded-b-lg" : null, // Round bottom left & right if it's the last one
                className,
            )}
            onClick={onClick}
            {...rest}
        >
            {children}
        </div>
    );
};

Item.displayName = "PopoverList.Item";

PopoverList.Item = Item;
