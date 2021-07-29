import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

const colors = {
    primary: "bg-primary hover:bg-primary-dark disabled:bg-primary border-transparent text-white",
    secondary: "bg-secondary hover:bg-secondary-dark disabled:bg-secondary border-transparent",
    success: "bg-success hover:bg-success-dark disabled:bg-success border-transparent text-white",
    warning: "bg-warning hover:bg-warning-dark disabled:bg-warning border-transparent text-white",
    danger: "bg-danger hover:bg-danger-dark disabled:bg-danger border-transparent text-white",
    outline:
        "hover:bg-secondary-lighter disabled:bg-secondary-light border-secondary-light hover:border-black disabled:border-transparent disabled:text-gray-dark",
    link: "border-transparent hover:underline",
};

const sizes = {
    tiny: "px-2 py-0.5 text-xs leading-xs", // 20px
    small: "px-3.5 py-2 text-sm leading-sm", // 30px
    medium: "px-4.5 py-3 text-base leading-base", // 40px
    large: "px-6 py-4 text-md leading-md", // 50px
};

const buttonBaseClassName = "rounded transition-colors border focus:ring disabled:opacity-60 disabled:cursor-default";

export const Button = ({
    as: Tag = "button",
    color = "primary",
    size = "medium",
    icon,
    iconPlacement = "left",
    className,
    children,
    ...rest
}) => {
    return (
        <Tag
            className={clsx(
                className,
                buttonBaseClassName,
                "inline-flex justify-center items-center font-semibold",
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

const Icon = ({ className, as: Tag = "button", color = "primary", size = "medium", children: icon, ...rest }) => {
    return (
        <Tag className={clsx(className, buttonBaseClassName, colors[color], sizes[size])} {...rest}>
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
    children: PropTypes.node.isRequired,
};
Button.Icon = Icon;
