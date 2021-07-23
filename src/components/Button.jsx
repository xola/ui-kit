import clsx from "clsx";
import PropTypes from "prop-types";
import React, { cloneElement } from "react";

const colors = {
    primary: "bg-primary hover:bg-primary-dark disabled:bg-primary border-transparent text-white",
    secondary: "bg-secondary hover:bg-secondary-dark disabled:bg-secondary border-transparent text-white",
    success: "bg-success hover:bg-success-dark disabled:bg-success border-transparent text-white",
    warning: "bg-warning hover:bg-warning-dark disabled:bg-warning border-transparent text-white",
    danger: "bg-danger hover:bg-danger-dark disabled:bg-danger border-transparent text-white",
};

const sizes = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-5 py-2.5 text-lg",
};

const variants = {
    outline: {
        global: "bg-white text-black border-secondary-dark disabled:border-secondary-dark",
        primary: "hover:bg-blue-lighter hover:border-blue",
        secondary: "hover:bg-secondary-lighter hover:secondary-blue",
        success: "hover:bg-success-lighter hover:border-success",
        warning: "hover:bg-warning-lighter hover:border-warning",
        danger: "hover:bg-danger-lighter hover:border-danger",
    },
    link: {
        global: "bg-white hover:bg-white border-transparent hover:underline",
        primary: "text-primary",
        secondary: "text-secondary",
        success: "text-success",
        warning: "text-warning",
        danger: "text-danger",
    },
};

const buttonBaseClassName = "transition-colors border focus:ring disabled:opacity-60 disabled:cursor-default";

export const Button = ({
    as: Tag = "button",
    className,
    color = "primary",
    size = "medium",
    variant,
    icon,
    iconPlacement = "left",
    children,
    ...rest
}) => {
    return (
        <Tag
            className={clsx(
                className,
                buttonBaseClassName,
                "inline-flex justify-center items-center font-semibold rounded",
                colors[color],
                sizes[size],
                variant ? variants[variant].global : "",
                variant ? variants[variant][color] : "",
            )}
            {...rest}
        >
            {icon && iconPlacement === "left" ? <span className="flex-shrink-0 mr-2">{icon}</span> : null}
            {children}
            {icon && iconPlacement === "right" ? <span className="flex-shrink-0 ml-2">{icon}</span> : null}
        </Tag>
    );
};

Button.propTypes = {
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
    className: PropTypes.string,
    color: PropTypes.oneOf(Object.keys(colors)),
    size: PropTypes.oneOf(Object.keys(sizes)),
    variant: PropTypes.oneOf(Object.keys(variants)),
    icon: PropTypes.element,
    iconPlacement: PropTypes.oneOf(["left", "right"]),
    children: PropTypes.node.isRequired,
};

// `Button.Icon` requires custom padding and icon sizes.

const buttonIconSizes = {
    small: "p-1.5",
    medium: "p-2",
    large: "p-2.5",
};

const iconSizes = {
    small: "h-3 w-3",
    medium: "h-4 w-4",
    large: "h-5 w-5",
};

const iconVariants = {
    primary: "text-primary hover:text-white border-primary hover:bg-blue hover:border-blue",
    secondary: "text-secondary hover:text-white border-secondary hover:bg-secondary hover:secondary-blue",
    success: "text-success hover:text-white border-success hover:bg-success hover:border-success",
    warning: "text-warning hover:text-white border-warning hover:bg-warning hover:border-warning",
    danger: "text-danger hover:text-white border-danger hover:bg-danger hover:border-danger",
};

const Icon = ({
    className,
    as: Tag = "button",
    color = "primary",
    size = "medium",
    variant,
    children: icon,
    ...rest
}) => {
    return (
        <Tag
            className={clsx(
                className,
                buttonBaseClassName,
                "rounded border-none",
                colors[color],
                buttonIconSizes[size],
                variant ? variants[variant].global : "",
                variant ? iconVariants[color] : "",
            )}
            {...rest}
        >
            {icon}
        </Tag>
    );
};

Icon.displayName = "Button.Icon";
Icon.propTypes = {
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
    className: PropTypes.string,
    color: PropTypes.oneOf(Object.keys(colors)),
    size: PropTypes.oneOf(Object.keys(sizes)),
    variant: PropTypes.oneOf(Object.keys(variants)),
    children: PropTypes.node.isRequired,
};
Button.Icon = Icon;
