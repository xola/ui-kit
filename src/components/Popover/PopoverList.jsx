import clsx from "clsx";
import PropTypes from "prop-types";
import React, { Children } from "react";
import { Popover } from "./Popover";

export const PopoverList = ({ placement = "bottom", className, children, ...rest }) => {
    const childrenArray = Children.toArray(children);
    const innerContent = childrenArray.filter((child) => child.type !== PopoverList.Item);
    const totalItems = childrenArray.length - innerContent.length;
    const items = childrenArray.map((child, position) => {
        return child.type === PopoverList.Item ? React.cloneElement(child, { position, total: totalItems }) : null;
    });

    const content = (
        <Popover.Content className="p-0 divide-y divide-solid ui-popover-list-content divide-gray-lighter">
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

PopoverList.propTypes = {
    placement: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

const Item = ({ name, isActive = false, position, total, children, className, onClickItem, ...rest }) => {
    const onClick = (event) => onClickItem(event, name);

    return (
        <div
            name={name}
            className={clsx(
                "ui-popover-list-item",
                "flex align-text-top p-4 space-x-2.5 font-semibold leading-4 tracking-tightest cursor-pointer hover:bg-gray-lighter",
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
Item.propTypes = {
    position: PropTypes.number,
    total: PropTypes.number,
    name: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    onClickItem: PropTypes.func.isRequired,
};

PopoverList.Item = Item;
