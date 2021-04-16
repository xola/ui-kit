import clsx from "clsx";
import React from "react";

export const NotificationCount = ({ className, ...rest }) => {
    return (
        <span
            className={clsx(
                className,
                "inline-block px-1.5 py-0.5 font-semibold items-center justify-center rounded-full bg-red-dark text-white leading-none",
            )}
            {...rest}
        />
    );
};
