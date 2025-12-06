import clsx from "clsx";
import React from "react";

export interface CounterProps extends React.HTMLAttributes<HTMLSpanElement> {
    readonly className?: string;
}

export const Counter = ({ className, ...rest }: CounterProps) => {
    return (
        <span
            className={clsx(
                "ui-counter",
                "inline-flex items-center justify-center rounded-full bg-danger-dark px-2 py-1 font-semibold leading-none text-white",
                className,
            )}
            {...rest}
        />
    );
};
