import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { getInitials } from "../helpers/avatar";

const sizes = {
    tiny: "h-7 w-7 text-base",
    small: "h-10 w-10 text-base",
    medium: "h-12 w-12 text-md",
    large: "h-15 w-15 text-xl",
};

const borderRadius = {
    none: "rounded-none",
    quarter: "rounded-md",
    half: "rounded-xl",
    full: "rounded-full",
};

// rounded "full", "half" "quarter" "none"
export const Avatar = ({ className, name, color = "bg-primary-lighter", size = "large", rounded,  ...rest }) => {
    const classes = clsx(
        "ui-avatar",
        "inline-flex items-center justify-center text-black leading-none",
        sizes[size],
        borderRadius[rounded],
        color,
        className,
    );

    return (
        <div title={name} className={classes} {...rest}>
            {getInitials(name)}
        </div>
    );
};

Avatar.propTypes = {
    className: PropTypes.string,
    color: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.oneOf(Object.keys(sizes)),
};
