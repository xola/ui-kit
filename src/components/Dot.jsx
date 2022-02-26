import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

const colors = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
    caution: "bg-caution",
};

export const Dot = ({ color = "primary", className, ...rest }) => {
    return (
        <span
            className={clsx("ui-dot", "inline-block h-1 w-1 rounded-full text-white", colors[color], className)}
            {...rest}
        />
    );
};

Dot.propTypes = {
    className: PropTypes.string,
    color: PropTypes.oneOf(Object.keys(colors)),
};
