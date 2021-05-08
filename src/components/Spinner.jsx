import React from "react";
import clsx from "clsx";
import CircleNotch from "../icons/CircleNotch";

const colors = {
    primary: "text-primary",
    secondary: "text-secondary",
    warning: "text-warning",
    success: "text-success",
    danger: "text-danger",
    caution: "text-caution",
    current: null, // TODO: Consider setting this as the default value.
};

const sizes = {
    xsmall: "w-4 h-4",
    small: "w-7 h-7",
    medium: "w-10 h-10",
    large: "w-14 h-14",
    current: "w-[1em] h-[1em]", // TODO: Consider setting this as the default value.
};

export const Spinner = ({ className, size = "small", color = "secondary", ...rest }) => {
    return <CircleNotch className={clsx(className, sizes[size], colors[color], "animate-spin inline-block")} />;
};
