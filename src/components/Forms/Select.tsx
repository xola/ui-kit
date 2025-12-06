import React, { forwardRef } from "react";
import { BaseInput, BaseInputProps } from "./BaseInput";

export interface SelectProps
    extends BaseInputProps,
        Omit<React.SelectHTMLAttributes<HTMLSelectElement>, keyof BaseInputProps> {}

export const Select = forwardRef<HTMLInputElement, SelectProps>((props, ref) => {
    return <BaseInput ref={ref} as="select" {...props} />;
});

Select.displayName = "Select";
