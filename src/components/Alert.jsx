import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

const colors = {
    primary: "bg-primary-lighter text-primary-dark",
    secondary: "bg-secondary-lighter text-secondary-dark",
    success: "bg-success-lighter text-success-dark",
    warning: "bg-warning-lighter text-warning-dark",
    danger: "bg-danger-lighter text-danger-dark",
    "danger-secondary": "bg-danger-secondary-lighter text-danger-secondary-dark",
};

export const Alert = ({ className, color = "primary", ...rest }) => {
    return <div className={clsx("flex rounded text-base px-2 py-3", colors[color], className)} {...rest} />;
};

Alert.propTypes = {
    className: PropTypes.string,
    color: PropTypes.oneOf(Object.keys(colors)),
};
