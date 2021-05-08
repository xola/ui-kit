import React from "react";
import clsx from "clsx";

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

export const Button = ({ className, color = "primary", size = "medium", iconStart, iconEnd, children, ...rest }) => {
    const icon = iconStart || iconEnd;
    if (icon && React.Children.count(children) === 0) {
        return <IconButton className={className} icon={icon} color={color} size={size} />;
    }

    return (
        <button
            className={clsx(
                className,
                "transition-colors border font-semibold focus:ring disabled:opacity-60 disabled:cursor-default rounded-md",
                colors[color],
                sizes[size],
            )}
            {...rest}
        >
            {iconStart && <IconWrapper className="mr-2">{iconStart}</IconWrapper>}
            {children}
            {iconEnd && <IconWrapper className="ml-2">{iconEnd}</IconWrapper>}
        </button>
    );
};

/**
 * Wrapper to give clases to the icon component
 */
const IconWrapper = (props) => {
    const { children, className, ...rest } = props;
    const _children = React.cloneElement(children);
    return (
        <span className={clsx(className)} {...rest}>
            {_children}
        </span>
    );
};

// These are Icon only buttons which require a custom padding and modification

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

export const IconButton = ({ className, icon, color, size = "small", ...rest }) => {
    return (
        <button
            className={clsx(className, "border inline-flex rounded", iconButtonSizes[size], colors[color])}
            {...rest}
        >
            <IconWrapper className={clsx("inline-flex items-center justify-center", iconSizes[size])}>
                {icon}
            </IconWrapper>
        </button>
    );
};
