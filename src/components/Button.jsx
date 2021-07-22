import clsx from "clsx";
import PropTypes from "prop-types";
import React, { cloneElement } from "react";

const colors = {
    primary: "bg-primary hover:bg-primary-dark disabled:bg-primary border-transparent text-white",
    secondary: "bg-secondary hover:bg-secondary-dark disabled:bg-secondary border-transparent text-white",
    success: "bg-success hover:bg-success-dark disabled:bg-success border-transparent text-white",
    warning: "bg-warning hover:bg-warning-dark disabled:bg-warning border-transparent text-white",
    danger: "bg-danger hover:bg-danger-dark disabled:bg-danger border-transparent text-white",
    link: "border-transparent hover:underline",
    outline: "bg-white border-secondary-dark hover:bg-blue-lighter hover:border-blue disabled:border-secondary-dark text-black",
    "outline.primary": "bg-white border-primary hover:bg-primary disabled:border-secondary-dark text-primary hover:text-white",
    "outline.success": "bg-white border-success hover:bg-success disabled:border-secondary-dark text-success hover:text-white",
    "outline.warning": "bg-white border-warning hover:bg-warning disabled:border-secondary-dark text-warning hover:text-white",
    "outline.danger": "bg-white border-danger hover:bg-danger disabled:border-secondary-dark text-danger hover:text-white",
};

const sizes = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-5 py-2.5 text-lg",
};

const buttonBaseClassName = "transition-colors border focus:ring disabled:opacity-60 disabled:cursor-default";

export const Button = ({
    as: Tag = "button",
    className,
    color = "primary",
    size = "medium",
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

const Icon = ({ className, as: Tag = "button", color = "primary", size = "medium", children: icon, ...rest }) => {
    return (
        <Tag
            className={clsx(className, buttonBaseClassName, "rounded", colors[color], buttonIconSizes[size])}
            {...rest}
        >
            {cloneElement(icon, { className: iconSizes[size] })}
        </Tag>
    );
};

Icon.displayName = "Button.Icon";
Icon.propTypes = {
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
    className: PropTypes.string,
    color: PropTypes.oneOf(Object.keys(colors)),
    size: PropTypes.oneOf(Object.keys(sizes)),
    children: PropTypes.node.isRequired,
};
Button.Icon = Icon;
