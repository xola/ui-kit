import clsx from "clsx";
import React from "react";
import { getInitials } from "../helpers/avatar";

const sizes = {
    tiny: "h-7 w-7 text-base",
    small: "h-10 w-10 text-base",
    medium: "h-12 w-12 text-md",
    large: "h-15 w-15 text-xl",
} as const;

type AvatarSize = keyof typeof sizes;

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    readonly name?: string;
    readonly color?: string;
    readonly size?: AvatarSize;
    readonly className?: string;
}

export const Avatar = ({ name, color = "bg-primary-lighter", size = "large", className, ...rest }: AvatarProps) => {
    const classes = clsx(
        "ui-avatar",
        "inline-flex items-center justify-center rounded-full text-black leading-none",
        sizes[size],
        color,
        className,
    );

    return (
        <div title={name} className={classes} {...rest}>
            {getInitials(name)}
        </div>
    );
};
