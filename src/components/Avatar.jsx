import clsx from "clsx";
import React from "react";
import PropTypes from "prop-types";

const sizes = {
    small: "h-8 w-8",
    medium: "h-12 w-12 text-lg",
    large: "h-16 w-16 text-2xl",
};

export const Avatar = ({ className, name, size = "large", ...rest }) => {
    let initials = "N/A";
    if (typeof name === "string" && name.trim().length > 0) {
        const pieces = name.split(" ");
        initials = pieces[0].slice(0, 1);
        if (pieces.length > 1) {
            initials += pieces[pieces.length - 1].slice(0, 1);
        }
    }

    const classes = clsx(
        className,
        sizes[size],
        "inline-flex items-center justify-center rounded-full bg-blue-lighter cursor-default text-black",
    );

    return (
        <div title={name} className={classes} {...rest}>
            {initials}
        </div>
    );
};

Avatar.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.oneOf(Object.keys(sizes)),
};
