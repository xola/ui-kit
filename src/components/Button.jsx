import clsx from "clsx";
import React from "react";

const colors = {
    primary: "bg-primary hover:bg-primary-dark disabled:bg-primary border-transparent text-white",
    secondary: "bg-secondary hover:bg-secondary-dark disabled:bg-secondary border-transparent text-white",
    success: "bg-success hover:bg-success-dark disabled:bg-success border-transparent text-white",
    warning: "bg-warning hover:bg-warning-dark disabled:bg-warning border-transparent text-white",
    danger: "bg-danger hover:bg-danger-dark disabled:bg-danger border-transparent text-white",
    outline: "bg-white border-secondary-dark hover:border-black disabled:border-secondary-dark text-black",
    link: "border-transparent hover:underline",
};

const sizes = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-5 py-2.5 text-lg",
};

export const Button = ({ className, color = "primary", size = "medium", children, ...rest }) => {
    return (
        <button
            className={clsx(
                className,
                "transition-colors inline-flex items-center border font-semibold focus:ring disabled:opacity-60 disabled:cursor-default rounded-md space-x-2",
                colors[color],
                sizes[size],
            )}
            {...rest}
        >
            {children}
        </button>
    );
};

// `Icon.Button` requires custom padding and icon sizes.

const iconButtonSizes = {
    small: "p-1.5",
    medium: "p-2",
    large: "p-2.5",
};

const iconSizes = {
    small: "h-3 w-3",
    medium: "h-4 w-4",
    large: "h-5 w-5",
};

Button.Icon = ({ className, size = "medium", as: Icon, ...rest }) => {
    // By explicitly setting the `size` prop to `null` we're disabling the default padding
    // on the main `Button` component so we can easily add new values via `className`.
    const buttonSize = null;

    return (
        <Button className={clsx(className, "rounded", iconButtonSizes[size])} size={buttonSize} {...rest}>
            <Icon className={iconSizes[size]} />
        </Button>
    );
};

Button.Icon.displayName = "Button.Icon";
