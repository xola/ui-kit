import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

const colors = {
    primary: "bg-primary-lighter text-black",
    secondary: "bg-secondary-lighter text-black",
    success: "bg-success-lighter text-black",
    warning: "bg-warning-lighter text-black",
    danger: "bg-danger-lighter text-black",
    "danger-secondary": "bg-danger-secondary-lighter text-black",
};

export const Alert = ({ className, color = "primary", ...rest }) => {
    return <div className={clsx("flex rounded text-base px-2 py-3", colors[color], className)} {...rest} />;
};

Alert.propTypes = {
    className: PropTypes.string,
    color: PropTypes.oneOf(Object.keys(colors)),
};
