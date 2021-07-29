import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

const colors = {
    primary: "bg-primary hover:bg-primary-dark disabled:bg-primary border-transparent text-white",
    secondary: "bg-secondary hover:bg-secondary-dark disabled:bg-secondary border-transparent text-white",
    success: "bg-success hover:bg-success-dark disabled:bg-success border-transparent text-white",
    warning: "bg-warning hover:bg-warning-dark disabled:bg-warning border-transparent text-white",
    danger: "bg-danger hover:bg-danger-dark disabled:bg-danger border-transparent text-white",
    outline:
        "bg-white hover:bg-secondary-lighter disabled:bg-secondary-light border-secondary-light hover:border-black disabled:border-transparent text-black disabled:text-gray-dark",
    link: "border-transparent hover:underline",
};

// Adhoc top padding is to get it to nice round heights (Barth feedback)
const sizes = {
    // tiny: "px-3 py-[7px] text-sm leading-3.5", // TODO:
    small: "px-3 py-[7px] text-sm leading-3.5", // height 30px
    medium: "px-4 py-[11px] text-base leading-4", // height 40px
    large: "px-6 py-[15px] text-md leading-4.5", // height 50px
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
                "inline-flex justify-center items-center font-semibold rounded tracking-tightest",
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

const Icon = ({ className, as: Tag = "button", color = "primary", size = "medium", children: icon, ...rest }) => {
    return (
        <Tag
            className={clsx(className, buttonBaseClassName, "rounded", colors[color], buttonIconSizes[size])}
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
    children: PropTypes.node.isRequired,
};
Button.Icon = Icon;
