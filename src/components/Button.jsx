import clsx from "clsx";
import PropTypes from "prop-types";
import { cloneElement, createElement, React } from "react";

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

const buttonBaseClassName = "transition-colors border focus:ring disabled:opacity-60 disabled:cursor-default";

export const Button = ({
    className,
    as = "button",
    icon,
    iconPlacement = "left",
    color = "primary",
    size = "medium",
    children,
    ...rest
}) => {
    return createElement(
        as,
        {
            className: clsx(
                className,
                buttonBaseClassName,
                "inline-flex items-center font-semibold rounded-md",
                colors[color],
                sizes[size],
            ),

            ...rest,
        },
        icon && iconPlacement === "left" ? <span className="flex-shrink-0 mr-2">{icon}</span> : null,
        children,
        icon && iconPlacement === "right" ? <span className="flex-shrink-0 ml-2">{icon}</span> : null,
    );
};

Button.propTypes = {
    className: PropTypes.string,
    as: PropTypes.string,
    icon: PropTypes.element,
    iconPlacement: PropTypes.string,
    color: PropTypes.oneOf(Object.keys(colors)),
    size: PropTypes.oneOf(Object.keys(sizes)),
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
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

IconWrapper.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
    className: PropTypes.string,
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    icon: PropTypes.element,
    iconPlacement: PropTypes.oneOf(["left", "right"]),
    color: PropTypes.oneOf(Object.keys(colors)),
    size: PropTypes.oneOf(Object.keys(sizes)),
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

Button.Icon = ({ className, as = "button", color = "primary", size = "medium", children: icon, ...rest }) => {
    return createElement(
        as,
        { className: clsx(className, buttonBaseClassName, "rounded", colors[color], buttonIconSizes[size]), ...rest },
        cloneElement(icon, { className: iconSizes[size] }),
    );
};

Button.Icon.displayName = "Button.Icon";

Button.Icon.propTypes = {
    className: PropTypes.string,
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    color: PropTypes.oneOf(Object.keys(colors)),
    size: PropTypes.oneOf(Object.keys(sizes)),
    children: PropTypes.element,
};
