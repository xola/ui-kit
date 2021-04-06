import React from "react";
import clsx from "clsx";

const colors = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
};

const sizes = {
    small: "px-1",
    medium: "px-2 py-0.5",
    large: "px-3 py-1",
};

export const Badge = ({ className, color = "primary", size = "medium", ...rest }) => {
    return (
        <span
            style={{ minWidth: 20 }}
            className={clsx(className, "font-semibold text-white rounded-full text-center", colors[color], sizes[size])}
            {...rest}
        />
    );
};
