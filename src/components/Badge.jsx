import React from "react";
import clsx from "clsx";

const colors = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
};

export const Badge = ({ className, color = "primary", ...rest }) => {
    return (
        <span
            style={{ minWidth: 20 }}
            className={clsx(className, "font-semibold px-2 py-1 text-white rounded-full text-center", colors[color])}
            {...rest}
        />
    );
};
