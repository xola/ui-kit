import clsx from "clsx";
import React from "react";
import { iconSizes } from "../icons/iconSizes";

export const createIcon = (Icon) => {
    return ({ size = "small", className, ...rest }) => {
        return <Icon className={clsx(iconSizes[size], className)} {...rest} />;
    };
};
