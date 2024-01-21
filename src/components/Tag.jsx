import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { CloseIcon } from "../icons/CloseIcon";

export const tagColors = {
    primary: "bg-primary-lighter text-black border border-primary",
    secondary: "bg-secondary-light text-gray-darker border border-secondary",
    success: "bg-success-lighter text-black border border-success",
    warning: "bg-warning-lighter text-black border border-warning",
    danger: "bg-danger-lighter text-black border border-danger",
    caution: "bg-caution-lighter text-black border border-caution",
};

export const tagSizes = {
    small: "px-1 py-0.75 text-sm leading-3.5",
    medium: "px-2 py-1 text-base leading-3.5",
    large: "px-2 py-1.5 text-base leading-4",
};

// Dashboard - height 25 Padding 6, 8Purchases - 20 padding 3,4

export const Tag = ({ color = "primary", size = "small", onClose, className, children, ...rest }) => {
    const handleClose = (e) => {
        e.stopPropagation(); // Stop from bubbling to the click handler for the tag itself
        onClose?.();
    };

    return (
        <span className={clsx("ui-tag", "inline-flex rounded", tagColors[color], tagSizes[size], className)} {...rest}>
            {children}

            {onClose ? (
                <CloseIcon
                    size="small"
                    className={clsx(
                        "ui-tag-close hover:text-gray-darker ml-2 cursor-pointer leading-4",
                        size === "large" ? "mt-0.5" : "mt-0.25",
                    )}
                    onClick={handleClose}
                />
            ) : null}
        </span>
    );
};

Tag.propTypes = {
    color: PropTypes.oneOf(Object.keys(tagColors)),
    size: PropTypes.oneOf(Object.keys(tagSizes)),
    onClose: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};
