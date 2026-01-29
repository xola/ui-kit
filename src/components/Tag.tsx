import React from "react";
import cn from "../helpers/classnames";
import { CloseIcon } from "../icons";

const colors = {
    primary: "bg-primary-lighter text-black border border-primary",
    secondary: "bg-secondary-light text-gray-darker border border-secondary",
    success: "bg-success-lighter text-black border border-success",
    warning: "bg-warning-lighter text-black border border-warning",
    danger: "bg-danger-lighter text-black border border-danger",
    caution: "bg-caution-lighter text-black border border-caution",
} as const;

const sizes = {
    small: "px-1 py-0.75 text-sm leading-3.5",
    medium: "px-2 py-1 text-base leading-3.5",
    large: "px-2 py-1.5 text-base leading-4",
} as const;

type TagColor = keyof typeof colors;
type TagSize = keyof typeof sizes;

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
    color?: TagColor;
    size?: TagSize;
    children: React.ReactNode;
    className?: string;
    onClose?: () => void;
}

export const Tag = ({ color = "primary", size = "small", children, className, onClose, ...rest }: TagProps) => {
    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        onClose?.();
    };

    return (
        <span className={cn("ui-tag", "inline-flex rounded", colors[color], sizes[size], className)} {...rest}>
            {children}

            {onClose ? (
                <CloseIcon
                    size="small"
                    className={cn(
                        "ui-tag-close ml-2 cursor-pointer leading-4 hover:text-gray-darker",
                        size === "large" ? "mt-0.5" : "mt-0.25",
                    )}
                    onClick={handleClose}
                />
            ) : null}
        </span>
    );
};
