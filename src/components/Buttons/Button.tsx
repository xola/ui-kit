import clsx from "clsx";
import React, { ElementType } from "react";

export const colors = {
    standard: {
        common: "border-transparent text-white", // Common classes for each style
        primary: "bg-primary hover:bg-primary-darker disabled:bg-primary active:bg-primary",
        secondary:
            "bg-secondary text-white hover:bg-secondary-dark disabled:bg-secondary border-transparent active:bg-secondary",
        success: "bg-success hover:bg-success-dark disabled:bg-success active:bg-success",
        warning: "bg-warning hover:bg-warning-dark disabled:bg-warning active:bg-warning",
        caution: "bg-caution hover:bg-caution-dark disabled:bg-caution active:bg-caution",
        danger: "bg-danger hover:bg-danger-dark disabled:bg-danger active:bg-danger",
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
} as const;

const sizes = {
    tiny: "px-2 py-0.5 text-xs leading-xs", // 20px
    small: "px-3 py-2 h-7.5 text-sm leading-sm", // 30px
    medium: "px-4.5 py-3 h-10 text-base leading-base", // 40px
    large: "px-6 py-4 h-[50px] text-md leading-md", // 50px
} as const;

type ButtonVariant = keyof typeof colors;
type ButtonColor = keyof typeof colors.outline;
type ButtonSize = keyof typeof sizes;
type IconPlacement = "left" | "right";

export interface ButtonProps<T extends ElementType = "button"> {
    as?: T;
    variant?: ButtonVariant;
    color?: ButtonColor;
    size?: ButtonSize;
    icon?: React.ReactElement;
    iconPlacement?: IconPlacement;
    children: React.ReactNode;
    className?: string;
}

export const Button = <T extends ElementType = "button">({
    as,
    variant = "standard",
    color = "primary",
    size = "medium",
    icon,
    iconPlacement = "left",
    children,
    className,
    ...rest
}: ButtonProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>) => {
    const Tag = as ?? "button";

    // Runtime validation in development
    if (process.env.NODE_ENV !== "production" && icon && !children) {
        console.error(
            "UI Kit: You are using an icon without specifying children. If you want to use an icon only specify it as a child instead of prop",
        );
    }

    const variantColors = colors[variant];
    const colorClass =
        color in variantColors ? variantColors[color as keyof typeof variantColors] : variantColors.primary;

    return (
        <Tag
            className={clsx(
                "ui-button",
                "inline-flex rounded border transition-colors focus:ring disabled:cursor-default disabled:bg-gray-lighter disabled:text-gray-dark",
                "items-center justify-center font-semibold",
                variantColors.common,
                colorClass,
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
