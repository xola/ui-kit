import clsx from "clsx";
import PropTypes from "prop-types";
import React, { cloneElement } from "react";

const colors = {
    primary: "bg-primary-lighter text-primary-dark",
    secondary: "bg-secondary-lighter text-black",
    success: "bg-success-lighter text-success-dark",
    warning: "bg-warning-lighter text-warning-dark",
    caution: "bg-caution-lighter text-caution-dark",
    danger: "bg-danger-lighter text-danger-dark",
    problem: "bg-warning text-white",
    critical: "bg-danger text-white",
};

const sizes = {
    small: "px-2 py-0.75 h-5 text-sm leading-sm", // 20px
    medium: "px-3 py-1.5 h-7.5 text-base leading-base", // 30px
    large: "px-3.5 py-0.75 h-10 text-lg leading-lg", // 40px
};

const iconSizes = {
    small: "w-3 h-3",
    medium: "w-4 h-4",
    large: "w-5 h-5 mr-1.5",
};

export const Badge = ({ color = "primary", size = "small", icon, className, children, ...rest }) => {
    return (
        <span
            className={clsx(
                "badge inline-flex items-center rounded-full whitespace-nowrap",
                colors[color],
                sizes[size],
                className,
            )}
            {...rest}
        >
            {icon ? cloneElement(icon, { className: clsx("mr-1", iconSizes[size]) }) : null}
            {children}
        </span>
    );
};

Badge.propTypes = {
    className: PropTypes.string,
    color: PropTypes.oneOf(Object.keys(colors)),
    size: PropTypes.oneOf(Object.keys(sizes)),
    icon: PropTypes.element,
    children: PropTypes.node.isRequired,
};
