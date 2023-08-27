import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

export const colors = {
    standard: {
        common: "border-transparent text-white", // Common classes for each style
        primary: "bg-primary hover:bg-primary-darker active:bg-primary",
        secondary: "bg-secondary text-white hover:bg-secondary-dark border-transparent active:bg-secondary",
        success: "bg-success hover:bg-success-dark active:bg-success",
        warning: "bg-warning hover:bg-warning-dark active:bg-warning",
        caution: "bg-caution hover:bg-caution-dark active:bg-caution",
        danger: "bg-danger hover:bg-danger-dark active:bg-danger",
    },
    outline: {
        common: "bg-white border hover:bg-white active:text-white", // Common classes for each style
        default:
            "border-gray-light hover:border-gray-dark active:bg-primary-lighter active:text-black active:border-primary",
        primary:
            "text-primary border-primary hover:text-primary-dark hover:border-primary-dark active:bg-primary-light",
        secondary:
            "border-gray-light hover:border-gray-dark active:bg-primary-lighter active:text-black active:border-primary",
        success:
            "text-success border-success hover:text-success-dark hover:border-success-dark active:bg-success-light",
        warning:
            "text-warning border-warning hover:text-warning-dark hover:border-warning-dark active:bg-warning-light",
        caution:
            "text-caution border-caution hover:text-caution-dark hover:border-caution-dark active:bg-caution-light",
        danger: "text-danger border-danger hover:text-danger-dark hover:border-danger-dark active:bg-danger-light",
    },
    link: {
        common: "border-transparent hover:underline",
        primary: "text-primary",
        secondary: "text-secondary",
        success: "text-success",
        warning: "text-warning",
        caution: "text-caution",
        danger: "text-danger",
    },
};

const sizes = {
    tiny: "px-2 py-0.5 min-w-7.5 text-xs leading-xs", // 20px
    small: "px-2 py-3 min-w-7.5 h-7.5 text-sm leading-sm", // 30px
    medium: "px-3 py-3 min-w-10 h-10 text-base leading-base", // 40px
    large: "px-4 py-4 min-w-[50px] h-[50px] text-md leading-md", // 50px
};

export const Button = ({
    as: Tag = "button",
    variant = "standard",
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
                "ui-button",
                "inline-flex rounded border transition-colors focus:ring disabled:cursor-default disabled:bg-gray-lighter disabled:text-gray-dark",
                "items-center justify-center font-semibold",
                colors[variant].common,
                colors[variant][color],
                sizes[size],
                className,
            )}
            {...rest}
        >
            {icon && iconPlacement === "left" ? <span className="mr-2 flex-shrink-0">{icon}</span> : null}
            {children}
            {icon && iconPlacement === "right" ? <span className="ml-2 flex-shrink-0">{icon}</span> : null}
        </Tag>
    );
};

Button.propTypes = {
    // as: PropTypes.string,
    color: PropTypes.oneOf(Object.keys(colors.outline)),
    variant: PropTypes.oneOf(Object.keys(colors)),
    size: PropTypes.oneOf(Object.keys(sizes)),
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    icon(props, ...rest) {
        // See: https://reactjs.org/docs/typechecking-with-proptypes.html#proptypes
        if (props.icon && !props.children) {
            return new Error(
                "UI Kit: You are using an icon without specifying children. If you want to use an icon only specify it as a child instead of prop",
            );
        }

        return PropTypes.element(props, ...rest);
    },
    iconPlacement: PropTypes.string,
};
