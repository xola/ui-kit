import clsx from "clsx";
import React from "react";

const sizes = {
    small: "h-8 w-8",
    medium: "h-12 w-12 text-lg",
    large: "h-16 w-16 text-2xl",
};

export const Avatar = ({ className, name, size = "large", ...rest }) => {
    const pieces = name.split(" ");
    let initials = pieces[0].slice(0, 1);
    if (pieces.length > 1) {
        initials += pieces[pieces.length - 1].slice(0, 1);
    }

    return (
        <div
            title={name}
            className={clsx(
                className,
                sizes[size],
                "inline-flex items-center justify-center rounded-full bg-blue-lighter cursor-default text-black",
            )}
            {...rest}
        >
            {initials}
        </div>
    );
};
