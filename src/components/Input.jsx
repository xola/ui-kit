import clsx from "clsx";
import React from "react";

export const Input = ({ className, type = "text", disabled, error, ...rest }) => {
    return (
        <input
            type={type}
            disabled={disabled}
            className={clsx(
                className,
                error ? "border-danger" : "border-gray-light",
                "block w-full py-3 px-2.5 placeholder-gray-dark text-gray-darker rounded-md",
                disabled && "bg-gray-lighter",
            )}
            {...rest}
        />
    );
};
