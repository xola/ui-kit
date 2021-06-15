import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { getInitials } from "../helpers/avatar";

const sizes = {
    small: "h-10 w-10 text-base",
    medium: "h-12 w-12 text-md",
    large: "h-15 w-15 text-xl",
};

export const Avatar = ({ className, name, color = "bg-primary-lighter", size = "large", ...rest }) => {
    const classes = clsx(
        "inline-flex items-center justify-center rounded-full cursor-default text-black",
        sizes[size],
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
