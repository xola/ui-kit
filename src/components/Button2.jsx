import clsx from "clsx";
import React from "react";

const colors = {
    standard: {
        common: "border-transparent text-white", // Common classes for each style
        primary: "bg-primary hover:bg-primary-dark disabled:bg-primary active:bg-primary",
        secondary:
            "bg-secondary text-black hover:bg-secondary-dark disabled:bg-secondary border-transparent active:bg-secondary",
        success: "bg-success hover:bg-success-dark disabled:bg-success active:bg-success",
        warning: "bg-warning hover:bg-warning-dark disabled:bg-warning active:bg-warning",
        caution: "bg-caution hover:bg-caution-dark disabled:bg-caution active:bg-caution",
        danger: "bg-danger hover:bg-danger-dark disabled:bg-danger active:bg-danger",
    },
    outline: {
        common: "bg-white border hover:bg-white active:text-white", // Common classes for each style
        primary:
            "text-primary border-primary hover:text-primary-dark hover:border-primary-dark active:bg-primary-light",
        secondary:
            "text-secondary border-secondary hover:text-secondary-dark hover:border-secondary-dark active:bg-secondary-light",
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
    tiny: "px-2 py-0.5 text-xs leading-xs", // 20px
    small: "px-3 py-2 h-[30px] text-sm leading-sm", // 30px
    medium: "px-4.5 py-3 h-[40px] text-base leading-base", // 40px
    large: "px-6 py-4 h-[50px] text-md leading-md", // 50px
};

export const Button2 = ({
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
    if (icon && !children) {
        console.warn(
            "UI Kit: You are using an icon without children. If you want to use an icon only specify it as a child instead of prop",
        );
    }

    return (
        <Tag
            className={clsx(
                "ui-button",
                "inline-flex rounded transition-colors border focus:ring disabled:opacity-60 disabled:cursor-default",
                "justify-center items-center font-semibold focus:ring-0",
                colors[variant].common,
                colors[variant][color],
                sizes[size],
                className,
            )}
            {...rest}
        >
            {icon && iconPlacement === "left" ? <span className="flex-shrink-0 mr-2">{icon}</span> : null}
            {children ? children : null}
            {icon && iconPlacement === "right" ? <span className="flex-shrink-0 ml-2">{icon}</span> : null}
        </Tag>
    );
};
