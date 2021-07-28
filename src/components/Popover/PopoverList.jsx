import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { Popover } from "./Popover";

export const PopoverList = ({ placement = "bottom", innerContent, className, children, ...rest }) => {
    const content = (
        <Popover.Content className="divide-y divide-solid divide-gray-lighter p-0">{children}</Popover.Content>
    );
    return (
        <Popover content={content} placement={placement} className={clsx("w-[160px]", className)} {...rest}>
            {innerContent}
        </Popover>
    );
};

PopoverList.propTypes = {
    placement: PropTypes.string,
    className: PropTypes.string,
    innerContent: PropTypes.element.isRequired,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

const Item = ({ name, children, className, onClickItem, ...rest }) => {
    const onClick = (event_) => onClickItem(event_, name);

    return (
        <div
            name={name}
            className={clsx(
                "flex align-text-top p-4 space-x-2.5 font-semibold leading-4 tracking-tightest cursor-pointer hover:bg-gray-lighter",
                className,
            )}
            onClick={onClick}
            {...rest}
        >
            {children}
        </div>
    );
};

Item.propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
    className: PropTypes.string,
    onClickItem: PropTypes.func.isRequired,
};

PopoverList.Item = Item;
