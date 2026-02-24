import clsx from "clsx";
import React, { forwardRef } from "react";
import { BaseInput, type BaseInputProps } from "./BaseInput";

export interface InputProps
    extends BaseInputProps,
        Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof BaseInputProps> {
    type?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type = "text", value, ...rest }, ref) => {
    return (
        <BaseInput ref={ref} as="input" className={clsx("ui-input", className)} type={type} value={value} {...rest} />
    );
});

Input.displayName = "Input";
