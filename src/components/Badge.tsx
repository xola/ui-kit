import React, { cloneElement } from "react";
import cn from "../helpers/classnames";

const colors = {
    primary: "bg-primary-lighter text-primary-dark",
    secondary: "bg-secondary-lighter text-black",
    success: "bg-success-lightish text-success-darker",
    warning: "bg-warning-lightish text-warning-darker",
    caution: "bg-caution-lighter text-caution-dark",
    danger: "bg-danger-lightish text-danger-dark",
    problem: "bg-warning text-white",
    critical: "bg-danger text-white",
} as const;

const sizes = {
    tiny: "px-2 py-0.5 h-4 text-xs",
    small: "px-2 py-0.75 h-5 text-sm leading-sm",
    medium: "px-3 py-1.5 h-7.5 text-base leading-base",
    large: "px-3.5 py-0.75 h-8 text-md leading-md",
} as const;

const iconSizes = {
    tiny: "!w-2.5 !h-2.5",
    small: "!w-3 !h-3",
    medium: "!w-4 !h-4",
    large: "!w-4.5 !h-4.5 mr-1",
} as const;

type BadgeColor = keyof typeof colors;
type BadgeSize = keyof typeof sizes;

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    color?: BadgeColor;
    size?: BadgeSize;
    icon?: React.ReactElement;
    children: React.ReactNode;
    className?: string;
}

export const Badge = ({ color = "primary", size = "small", icon, children, className, ...rest }: BadgeProps) => {
    return (
        <span
            className={cn(
                "ui-badge",
                "inline-flex items-center whitespace-nowrap rounded-full",
                colors[color],
                sizes[size],
                className,
            )}
            {...rest}
        >
            {icon ? cloneElement(icon, { className: cn("mr-1", iconSizes[size]) }) : null}
            {children}
        </span>
    );
};
