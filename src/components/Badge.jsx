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
    small: "text-xs px-2.5 py-0.5",
    medium: "text-sm  px-3.5 py-1",
    large: "text-md px-4 py-1.5",
};

export const Badge = ({ className, color = "primary", size = "medium", ...rest }) => {
    return <span className={clsx(className, "rounded-full text-center", colors[color], sizes[size])} {...rest} />;
};

Badge.propTypes = {
    className: PropTypes.string,
    color: PropTypes.oneOf(Object.keys(colors)),
    size: PropTypes.oneOf(Object.keys(sizes)),
};
