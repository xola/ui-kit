import clsx from "clsx";
import React from "react";

const sizes = {
    small: "px-2 py-1.5 text-sm",
    medium: "py-3 px-2.5 text-base",
    large: "px-4 py-3.5 text-lg",
};

export const Input = ({ size = "medium", className, type = "text", disabled, error, ...rest }) => {
    return (
        <input
            type={type}
            disabled={disabled}
            className={clsx(
                className,
                sizes[size],
                error ? "border-danger" : "border-gray-light",
                "block w-full placeholder-gray-dark text-gray-darker rounded-md",
                disabled && "bg-gray-lighter",
            )}
            {...rest}
        />
    );
};
