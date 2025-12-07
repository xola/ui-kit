import clsx from "clsx";
import React from "react";
import { Button } from "./Button";
import type { ButtonProps } from "./Button";

const colors = {
    outline: {
        primary: "bg-primary-lighter border border-primary hover:bg-primary-light hover:border-primary-dark",
        secondary: "bg-secondary-light border border-secondary-light hover:bg-secondary-light hover:border-secondary",
        success: "bg-success-lightish border border-success hover:bg-success-light hover:border-success-dark",
        warning: "bg-warning-lightish border border-warning hover:bg-warning-light hover:border-warning-dark",
        caution: "bg-caution-lightish border border-caution hover:bg-caution-light hover:border-caution-dark",
        danger: "bg-danger-lightish border border-danger hover:bg-danger-light hover:border-danger-dark",
    },
} as const;

type ToggleVariant = keyof typeof colors;
type ToggleColor = keyof typeof colors.outline;

export interface ToggleButtonProps extends Omit<ButtonProps, "variant" | "color"> {
    color?: ToggleColor;
    variant?: ToggleVariant;
    isActive: boolean;
}

export const ToggleButton = ({
    color = "primary",
    variant = "outline",
    isActive,
    className,
    ...rest
}: ToggleButtonProps) => {
    return (
        <Button
            color={color}
            variant={variant}
            className={clsx(
                "text-black",
                className,
                isActive ? colors[variant][color] : `bg-white hover:bg-${color}-lighter hover:border-${color}`,
            )}
            {...rest}
        />
    );
};
