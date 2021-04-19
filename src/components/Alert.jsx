import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

/**
 * @enum {string}
 */
const colors = {
    primary: "bg-primary-lighter text-primary-dark",
    secondary: "bg-secondary-lighter text-secondary-dark",
    success: "bg-success-lighter text-success-dark",
    warning: "bg-warning-lighter text-warning-dark",
    danger: "bg-red-lighter text-red-dark",
};

const sizes = {
    small: "text-sm h-9",
    medium: "text-md h-11",
    large: "text-lg h-14",
};

export const Alert = ({ className, color = "primary", size = "medium", ...rest }) => {
    return (
        <div
            className={clsx("flex justify-center items-center rounded", colors[color], sizes[size], className)}
            {...rest}
        />
    );
};

Alert.propTypes = {
    className: PropTypes.string,
    color: PropTypes.oneOf(Object.keys(colors)),
    size: PropTypes.oneOf(Object.keys(sizes)),
};
