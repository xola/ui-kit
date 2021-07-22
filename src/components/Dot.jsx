import clsx from "clsx";
import PropTypes from "prop-types";
import React, { cloneElement } from "react";

const colors = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
    caution: "bg-caution",
};

export const Dot = ({ color = "primary", className, ...rest }) => {
    return <span className={clsx("inline-block w-1 h-1 rounded-full text-white", colors[color])} {...rest}></span>;
};
