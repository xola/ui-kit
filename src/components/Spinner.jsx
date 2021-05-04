import React from "react";
import clsx from "clsx";

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
    small: "w-7 h-7",
    medium: "w-10 h-10",
    large: "w-14 h-14",
    current: "w-[1em] h-[1em]", // TODO: Consider setting this as the default value.
};

export const Spinner = ({ className, size = "small", color = "secondary", ...rest }) => {
    return (
        <svg
            className={clsx(className, sizes[size], colors[color], "animate-spin inline-block")}
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            fill="none"
            viewBox="0 0 14 14"
            {...rest}
        >
            <path fill="currentColor" d="M14 7a7 7 0 10-7 7v-1.4A5.6 5.6 0 1112.6 7H14z" />
        </svg>
    );
};
