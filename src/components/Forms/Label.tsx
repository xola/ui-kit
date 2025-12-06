import clsx from "clsx";
import React from "react";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    isDisabled?: boolean;
    isError?: boolean;
    className?: string;
}

export const Label = ({ isDisabled = false, isError = false, className, ...rest }: LabelProps) => {
    return (
        <label
            className={clsx(
                "ui-label",
                className,
                "mb-1 block text-sm font-bold",
                isError ? "text-danger" : isDisabled ? "text-gray" : "text-black",
            )}
            {...rest}
        />
    );
};
