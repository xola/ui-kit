import clsx from "clsx";
import PropTypes from "prop-types";
import React, { cloneElement } from "react";

const colors = {
    primary: "bg-primary text-white",
    success: "bg-green text-white",
    warning: "bg-yellow",
    danger: "bg-red text-white",
};

const sizes = {
    medium: "pl-3 pr-3.5 py-1.5 text-base",
};

export const Pill = ({ icon, color = "primary", size = "medium", children, className, ...rest }) => {
    return (
        <div
            className={clsx(
                "inline-flex items-center h-7.5 text-base font-semibold rounded-full tracking-tightest leading-none",
                colors[color],
                sizes[size],
                className,
            )}
            {...rest}
        >
            {icon ? cloneElement(icon, { className: "inline-flex mr-1.5" }) : null}
            {children}
        </div>
    );
};

Pill.propTypes = {
    icon: PropTypes.element,
    color: PropTypes.string,
    size: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
    className: PropTypes.string,
};
