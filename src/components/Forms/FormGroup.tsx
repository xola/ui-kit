import React from "react";
import cn from "../../helpers/classnames";

export interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

export const FormGroup = ({ className, ...rest }: FormGroupProps) => {
    return <div className={cn("ui-form-group", className, "mb-4")} {...rest} />;
};
