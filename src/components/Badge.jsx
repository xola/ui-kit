import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

/**
 * @enum {string}
 */
const colors = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
};

const sizes = {
    small: "px-1",
    medium: "px-2 py-0.5",
    large: "px-3 py-1",
};

/**
 * @param {colors} props.color
 * @returns
 */
export const Badge = ({ className, color = "primary", size = "medium", ...rest }) => {
    return (
        <span
            className={clsx(className, "font-semibold text-white rounded-full text-center", colors[color], sizes[size])}
            {...rest}
        />
    );
};

Badge.propTypes = {
    className: PropTypes.string,
    color: PropTypes.oneOf(Object.keys(colors)),
    size: PropTypes.oneOf(Object.keys(sizes)),
};
