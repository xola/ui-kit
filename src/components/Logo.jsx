import React from "react";
import clsx from "clsx";

const sizes = {
    small: "w-10 h-10",
    medium: "w-16 h-16",
    large: "w-20 h-20",
};

export const Logo = ({ className, src, size = "small" }) => {
    return <img src={src} className={clsx(className, "inline-flex items-center rounded object-cover", sizes[size])} />;
};
