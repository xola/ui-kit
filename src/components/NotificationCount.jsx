import clsx from "clsx";
import React from "react";

export const NotificationCount = ({ className, ...rest }) => {
    return (
        <span
            className={clsx(
                className,
                "px-2 py-1 font-semibold inline-flex items-center justify-center rounded-full bg-red-dark text-white leading-none",
            )}
            {...rest}
        />
    );
};
