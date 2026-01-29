import React from "react";
import cn from "../helpers/classnames";
import { CircleNotch } from "../icons";

const colors = {
    primary: "text-primary",
    secondary: "text-secondary",
    warning: "text-warning",
    success: "text-success",
    danger: "text-danger",
    caution: "text-caution",
    current: null,
} as const;

const sizes = {
    tiny: "w-4 h-4",
    small: "w-7 h-7",
    medium: "w-10 h-10",
    large: "w-14 h-14",
    current: "w-[1em] h-[1em]",
} as const;

type SpinnerColor = keyof typeof colors;
type SpinnerSize = keyof typeof sizes;

export interface SpinnerProps extends React.SVGProps<SVGSVGElement> {
    size?: SpinnerSize;
    color?: SpinnerColor;
    className?: string;
}

export const Spinner = ({ size = "small", color = "secondary", className, ...rest }: SpinnerProps) => {
    return (
        <CircleNotch
            className={cn("ui-spinner", className, sizes[size], colors[color], "inline-block animate-spin")}
            {...rest}
        />
    );
};
