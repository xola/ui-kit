import type { ComponentPropsWithoutRef } from "react";
import cn from "../../helpers/classnames";

interface LabelProps extends ComponentPropsWithoutRef<"label"> {
    isDisabled?: boolean;
    isError?: boolean;
}

export const Label = ({ isDisabled = false, isError = false, className, ...rest }: LabelProps) => {
    return (
        <label
            className={cn(
                "ui-label",
                className,
                "mb-1 block text-sm font-bold",
                isError ? "text-danger" : isDisabled ? "text-gray" : "text-black",
            )}
            {...rest}
        />
    );
};
