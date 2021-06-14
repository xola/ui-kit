import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

const sizes = {
    small: "w-10 h-10",
    medium: "w-16 h-16",
    large: "w-20 h-20",
};

export const Logo = ({ className, size = "small", ...rest }) => {
    return <img className={clsx(className, "inline-block rounded object-cover", sizes[size])} {...rest} />;
};

Logo.propTypes = {
    className: PropTypes.string,
    src: PropTypes.string.isRequired,
    size: PropTypes.string,
};
