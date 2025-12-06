import clsx from "clsx";
import React from "react";

export interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    readonly className?: string;
}

export const FormGroup = ({ className, ...rest }: FormGroupProps) => {
    return <div className={clsx("ui-form-group", className, "mb-4")} {...rest} />;
};
