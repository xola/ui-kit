import React from "react";
import clsx from "clsx";

const colors = {
    primary: "bg-primary border-primary hover:bg-primary-dark hover:border-primary-dark text-white",
    secondary: "bg-secondary border-secondary hover:bg-secondary-dark hover:border-secondary-dark text-white",
    success: "bg-success border-success hover:bg-success-dark hover:border-success-dark text-white",
    warning: "bg-warning border-warning hover:bg-warning-dark hover:border-warning-dark text-white",
    danger: "bg-danger border-danger hover:bg-danger-dark hover:border-danger-dark text-white text-white",
    outline: "text-black bg-white border-secondary-dark hover:border-black",
    link: "border-transparent hover:underline",
};

const sizes = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-5 py-2.5 text-lg",
};

export const Button = ({ className, color = "primary", size = "medium", iconStart, iconEnd, children }) => {
    const icon = iconStart || iconEnd;
    if (icon && !children) {
        console.log('Icon only with', icon);
        return <IconButton className={className} icon={icon} color={color} size={size} />
    }

    return (
        <button
            className={clsx(
                className,
                "transition-colors border font-semibold focus:ring disabled:opacity-50 rounded-md",
                colors[color],
                sizes[size],
            )}
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
        <span className={clsx(className, "inline")} {...rest}>{_children}</span>
    )
}

// These are Icon only buttons which require a custom padding and modification

const iconSizes = {
    small: 'px-1 py-0.50',
    medium: 'px-2 py-0.5',
    large: 'px-3 py-1.5',
}

export const IconButton = ({className, icon, color, size = 'small'}) => {
    console.log('Icon', color, size);
    return (
        <button className={clsx(className, "rounded", iconSizes[size], colors[color])}>
            <IconWrapper size={size}>{icon}</IconWrapper>
        </button>
    )
};