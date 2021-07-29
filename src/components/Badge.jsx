import clsx from "clsx";
import PropTypes from "prop-types";
import React, { cloneElement } from "react";

const colors = {
    primary: "bg-primary-lighter text-primary-dark",
    secondary: "bg-secondary-lighter text-black",
    success: "bg-success-lighter text-success-dark",
    warning: "bg-warning-lighter text-warning-dark",
    danger: "bg-danger-lighter text-danger-dark",
    caution: "bg-caution-lighter text-caution-dark",
};

const sizes = {
    small: "text-sm px-2 py-0.75 leading-p3",
    large: "text-base px-3 py-1.5 leading-none",
};

export const Badge = ({ className, color = "primary", size = "small", icon, children, ...rest }) => {
    return (
        <span
            className={clsx(
                "badge inline-flex items-center rounded-full text-center whitespace-nowrap",
                colors[color],
                sizes[size],
                className,
            )}
            {...rest}
        >
            {icon ? cloneElement(icon, { className: "mr-1 w-[1em] h-[1em]" }) : null}
            {children}
        </span>
    );
};

Badge.propTypes = {
    className: PropTypes.string,
    color: PropTypes.oneOf(Object.keys(colors)),
    size: PropTypes.oneOf(Object.keys(sizes)),
    icon: PropTypes.element,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
