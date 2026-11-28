import type { ComponentPropsWithoutRef } from "react";
import cn from "../helpers/classnames";

export const Counter = ({ className, ...rest }: ComponentPropsWithoutRef<"span">) => {
    return (
        <span
            className={cn(
                "ui-counter",
                "inline-flex items-center justify-center rounded-full bg-danger-dark px-2 py-1 font-semibold leading-none text-white",
                className,
            )}
            {...rest}
        />
    );
};
