import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { CloseIcon } from "../icons/CloseIcon";

const colors = {
    primary: "bg-primary-lighter text-black",
    secondary: "bg-secondary-lighter text-black",
    success: "bg-success-lighter text-black",
    warning: "bg-warning-lighter text-black",
    danger: "bg-danger-lighter text-black",
    caution: "bg-caution-lighter text-black",
};

export const Alert = ({ className, close = false, color = "primary", children, ...rest }) => {
    return (
        <div className={clsx("flex rounded text-base px-3 py-3", colors[color], className)} {...rest}>
            <span className="w-full">{children}</span>
            {close && (
                <span className="flex pt-1 cursor-pointer group items-top h-w-screen">
                    <CloseIcon className="inline group-hover:text-gray-dark" />
                </span>
            )}
        </div>
    );
};

Alert.propTypes = {
    className: PropTypes.string,
    close: PropTypes.bool,
    color: PropTypes.oneOf(Object.keys(colors)),
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};
