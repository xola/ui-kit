import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

const colors = {
    primary: "bg-primary-lighter text-primary-dark",
    secondary: "bg-secondary-lighter text-secondary-dark",
    success: "bg-success-lighter text-success-dark",
    warning: "bg-warning-lighter text-warning-dark",
    danger: "bg-danger-lighter text-danger-dark",
    "caution": "bg-caution-lighter text-caution-dark",
};

const sizes = {
    small: "text-sm px-2 py-0.75",
    large: "text-base px-3 py-1.5",
};

export const Badge = ({ className, color = "primary", size = "small", icon, children, ...rest }) => {
    return (
        <span className={clsx("badge rounded-full text-center", colors[color], sizes[size], className)} {...rest}>
            {icon && <IconWrapper className="mr-1 icon">{icon}</IconWrapper>}
            {children}
        </span>
    );
};

/**
 * Wrapper to give clases to the icon component
 */
const IconWrapper = (props) => {
    const { children, className, ...rest } = props;
    const _children = React.cloneElement(children);
    return (
        <span className={clsx("inline-flex align-middle text-2xl", className)} {...rest}>
            {_children}
        </span>
    );
};

Badge.propTypes = {
    className: PropTypes.string,
    color: PropTypes.oneOf(Object.keys(colors)),
    size: PropTypes.oneOf(Object.keys(sizes)),
};
