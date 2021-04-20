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
    small: "text-sm px-2 py-3",
    medium: "text-base px-3 py-4",
    large: "text-lg px-4 py-5",
};

export const Alert = ({ className, color = "primary", size = "medium", ...rest }) => {
    return <div className={clsx("flex rounded", colors[color], sizes[size], className)} {...rest} />;
};

Alert.propTypes = {
    className: PropTypes.string,
    color: PropTypes.oneOf(Object.keys(colors)),
    size: PropTypes.oneOf(Object.keys(sizes)),
};
