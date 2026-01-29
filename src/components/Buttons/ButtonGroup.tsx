import React, { Children, cloneElement, type ElementType, type ReactElement } from "react";
import cn from "../../helpers/classnames";

const sizes = {
    small: "px-2 py-1.5 text-sm",
    medium: "py-3 px-2.5 text-base",
    large: "px-4 py-3.5 text-lg",
} as const;

type ButtonGroupSize = keyof typeof sizes;
type IconPlacement = "left" | "right";

export interface ButtonGroupProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "onChange"> {
    size: ButtonGroupSize;
    value: number;
    isCollapsed?: boolean;
    children: React.ReactNode;
    className?: string;
    onChange: (index: number) => void;
}

const ButtonGroupComponent = ({
    size,
    value,
    isCollapsed = false,
    children,
    className,
    onChange,
    ...rest
}: ButtonGroupProps) => {
    return (
        <span className={cn("ui-button-group", "inline-flex whitespace-nowrap", className)} {...rest}>
            {Children.map(children, (child, index) => {
                if (!React.isValidElement(child)) {
                    return null;
                }

                if (child.props.isHidden) {
                    return null;
                }

                const buttonProps: Partial<ButtonGroupButtonProps> = { size };

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

export interface ButtonGroupButtonProps {
    as?: ElementType;
    isActive?: boolean;
    shouldShowText?: boolean;
    isHidden?: boolean;
    size?: ButtonGroupSize;
    icon?: React.ReactElement;
    iconPlacement?: IconPlacement;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

const ButtonGroupButton = ({
    as,
    isActive,
    shouldShowText = true,
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    isHidden = false,
    size = "medium",
    icon,
    iconPlacement = "left",
    children,
    className,
    ...rest
}: ButtonGroupButtonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonGroupButtonProps>) => {
    const Tag = as ?? "button";

    // Remove custom props that shouldn't be passed to DOM
    const domProps = { ...rest };
    delete (domProps as any).isActive;
    delete (domProps as any).shouldShowText;
    delete (domProps as any).isHidden;

    const classes = cn(
        "ui-button-group-button",
        "inline-flex border-t border-l border-b last:border-r first:rounded-l-md last:rounded-r-md transition-colors focus:ring disabled:opacity-60 focus:z-10 leading-none",
        sizes[size],
        isActive
            ? "bg-primary border-primary text-white hover:bg-primary-dark"
            : "border-gray-light hover:bg-gray-lighter text-gray-darker",
        className,
    );

    return (
        <Tag className={classes} {...domProps}>
            {icon && iconPlacement === "left" ? <span className="mr-2 flex-shrink-0">{icon}</span> : null}
            {/* Always show text if the icon isn't specified */}
            {shouldShowText ? children : icon ? null : children}
            {icon && iconPlacement === "right" ? <span className="ml-2 flex-shrink-0">{icon}</span> : null}
        </Tag>
    );
};

ButtonGroupButton.displayName = "ButtonGroup.Button";

export const ButtonGroup = Object.assign(ButtonGroupComponent, {
    Button: ButtonGroupButton,
});
