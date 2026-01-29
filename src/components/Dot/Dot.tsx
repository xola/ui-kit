import React from "react";
import cn from "../../helpers/classnames";

const colors = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
    caution: "bg-caution",
} as const;

const sizes = {
    small: "h-1 w-1",
    medium: "h-1.5 w-1.5",
    large: "h-2 w-2",
    xlarge: "h-8 w-8",
} as const;

type DotColor = keyof typeof colors;
type DotSize = keyof typeof sizes;

export interface DotProps extends React.HTMLAttributes<HTMLSpanElement> {
    color?: DotColor;
    size?: DotSize;
    className?: string;
}

export const Dot = ({ color = "primary", size = "medium", className, ...rest }: DotProps) => {
    return (
        <span
            className={cn("ui-dot", "inline-block rounded-full text-white", colors[color], sizes[size], className)}
            {...rest}
        />
    );
};
