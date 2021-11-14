import clsx from "clsx";
import React from "react";
import { Button, ButtonProps } from "./Button";

const colors = {
    primary: "bg-primary-lighter border border-primary-light hover:focus:bg-primary-lighter",
    secondary: "bg-secondary-lighter border border-secondary-light hover:focus:bg-secondary-lighter",
    success: "bg-success-lighter border border-success-light hover:focus:bg-success-lighter",
    warning: "bg-warning-lighter border border-warning-light hover:focus:bg-warning-lighter",
    caution: "bg-caution-lighter border border-caution-light hover:focus:bg-caution-lighter",
    danger: "bg-danger-lighter border border-danger-light hover:focus:bg-danger-lighter",
};

interface ToggleButtonProps extends Omit<ButtonProps, "variant"> {
    isActive: boolean;
    color: keyof typeof colors;
}

export const ToggleButton = ({ color = "primary", isActive, className, ...rest }: ToggleButtonProps) => {
    return (
        <Button
            color={color}
            variant="outline"
            className={clsx("text-black", className, isActive ? colors[color] : "border !border-gray-light")}
            {...rest}
        />
    );
};
