import React from "react";
import clsx from "clsx";

const colors = {
    primary: "bg-primary border-primary hover:bg-primary-dark hover:border-primary-dark text-white",
    secondary: "bg-secondary border-secondary hover:bg-secondary-dark hover:border-secondary-dark text-white",
    success: "bg-success border-success hover:bg-success-dark hover:border-success-dark text-white",
    warning: "bg-warning border-warning hover:bg-warning-dark hover:border-warning-dark text-white",
    danger: "bg-danger border-danger hover:bg-danger-dark hover:border-danger-dark text-white text-white",
    outline: "bg-white border-secondary-lightest hover:border-secondary text-black hover:text-secondary",
    link: "border-transparent hover:underline",
};

const sizes = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-5 py-2.5 text-lg",
};

export const Button = ({ className, color = "primary", size = "medium", ...rest }) => {
    return (
        <button
            className={clsx(
                className,
                "transition-colors border font-semibold focus:outline-none focus:ring disabled:opacity-50 rounded-md",
                colors[color],
                sizes[size],
            )}
            {...rest}
        />
    );
};
