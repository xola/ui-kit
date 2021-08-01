import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { CloseIcon } from "../icons/CloseIcon";

const colors = {
    primary: "bg-primary-lighter text-black border border-primary",
    secondary: "bg-secondary-light text-gray-darker border border-secondary",
    success: "bg-success-lighter text-black border border-success",
    warning: "bg-warning-lighter text-black border border-warning",
    danger: "bg-danger-lighter text-black border border-danger",
    caution: "bg-caution-lighter text-black border border-caution",
};

const sizes = {
    small: "px-1 py-0.75 text-sm",
    medium: "px-2 py-1 text-base",
};

// Dashboard - height 25 Padding 6, 8Purchases - 20 padding 3,4

export const Tag = ({
    color = "primary",
    size = "small",
    shouldAllowRemoval = true,
    onClose,
    className,
    children,
    ...rest
}) => {
    return (
        <span className={clsx("tag inline-flex rounded leading-3.5", colors[color], sizes[size], className)} {...rest}>
            {children}
            {shouldAllowRemoval ? (
                <CloseIcon
                    className="float-right ml-2 cursor-pointer text-block hover:text-gray-darker"
                    onClick={onClose}
                />
            ) : null}
        </span>
    );
};

Tag.propTypes = {
    className: PropTypes.string,
    color: PropTypes.oneOf(Object.keys(colors)),
    size: PropTypes.oneOf(Object.keys(sizes)),
    shouldAllowRemoval: PropTypes.bool,
    onClose: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.node]).isRequired,
};
