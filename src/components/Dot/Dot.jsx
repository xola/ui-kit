import PropTypes from "prop-types";
import React from "react";
import cn from "../../helpers/classnames";

const colors = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
    caution: "bg-caution",
};

const sizes = {
    small: "h-1 w-1",
    medium: "h-1.5 w-1.5",
    large: "h-2 w-2",
};

export const Dot = ({ color = "primary", size = "medium", className, ...rest }) => {
    return (
        <span
            className={cn("ui-dot", "inline-block rounded-full text-white", colors[color], sizes[size], className)}
            {...rest}
        />
    );
};

Dot.propTypes = {
    className: PropTypes.string,
    color: PropTypes.oneOf(Object.keys(colors)),
};
