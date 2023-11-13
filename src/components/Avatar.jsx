import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { getInitials } from "../helpers/avatar";

export const avatarSizes = {
    tiny: "h-7 w-7 text-base",
    small: "h-10 w-10 text-base",
    medium: "h-12 w-12 text-md",
    large: "h-15 w-15 text-xl",
};

export const Avatar = ({ className, name, color = "bg-primary-lighter", size = "large", ...rest }) => {
    const classes = clsx(
        "ui-avatar",
        "inline-flex items-center justify-center rounded-full text-black leading-none",
        avatarSizes[size],
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
    size: PropTypes.oneOf(Object.keys(avatarSizes)),
};
