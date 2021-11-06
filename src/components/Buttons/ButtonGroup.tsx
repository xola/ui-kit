import clsx from "clsx";
import React, { Children, cloneElement, ComponentType, HTMLAttributes, ReactElement, ReactNode } from "react";

const sizes = {
    small: "px-2 py-1.5 text-sm",
    medium: "py-3 px-2.5 text-base",
    large: "px-4 py-3.5 text-lg",
};

interface ButtonGroupProps extends Omit<HTMLAttributes<HTMLElement>, "onChange"> {
    className?: string;
    size?: keyof typeof sizes;
    value: number;
    onChange: (value: number) => void;
    children: ReactNode;
    isCollapsed?: boolean;
}

export const ButtonGroup = ({
    className,
    size = "medium",
    value,
    onChange,
    isCollapsed = false,
    children,
    ...rest
}: ButtonGroupProps) => {
    return (
        <span className={clsx("ui-button-group", "inline-flex whitespace-nowrap", className)} {...rest}>
            {Children.map(children, (child, index) => {
                const buttonProps: ButtonProps = { size };

                // Conditionally adding props like this so that we
                // are also able to control the props on `ButtonGroup.Button`
                // directly, if `value` and `onChange` are not passed on the parent.
                if (value !== undefined) {
                    buttonProps.isActive = value === index;
                }

                if (isCollapsed && value >= 0 && value !== index) {
                    buttonProps.shouldShowText = false;
                }

                if (onChange) {
                    buttonProps.onClick = () => onChange(index);
                }

                return cloneElement(child as ReactElement, buttonProps);
            })}
        </span>
    );
};

interface ButtonProps extends HTMLAttributes<HTMLElement> {
    as?: ComponentType<HTMLAttributes<HTMLElement>> | string;
    isActive?: boolean;
    shouldShowText?: boolean;
    size: keyof typeof sizes;
    icon?: ReactElement;
    iconPlacement?: "left" | "right";
    className?: string;
    children?: ReactNode;
}

const Button = ({
    as: Tag = "button",
    isActive = false,
    shouldShowText = true,
    size = "medium",
    icon,
    iconPlacement = "left",
    className,
    children,
    ...rest
}: ButtonProps) => {
    const classes = clsx(
        "ui-button-group-button",
        "inline-flex border-t border-l border-b last:border-r first:rounded-l-md last:rounded-r-md transition-colors focus:ring disabled:opacity-60 focus:z-10 leading-none",
        sizes[size],
        isActive
            ? "bg-primary border-primary text-white hover:bg-primary-dark"
            : "border-gray-light hover:bg-gray-lighter text-gray-darker",
        className,
    );

    return (
        <Tag className={classes} {...rest}>
            {icon && iconPlacement === "left" ? <span className="flex-shrink-0 mr-2">{icon}</span> : null}
            {shouldShowText ? children : null}
            {icon && iconPlacement === "right" ? <span className="flex-shrink-0 ml-2">{icon}</span> : null}
        </Tag>
    );
};

Button.displayName = "ButtonGroup.Button";
ButtonGroup.Button = Button;
