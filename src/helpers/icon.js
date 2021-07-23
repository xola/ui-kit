import clsx from "clsx";
import { iconSizes } from "../icons/iconSizes";
import { cloneElement } from "react";

export const renderIcon = (props = { size: "small" }, icon) => {
    let { className, size, ...newProps } = props;
    className = clsx(iconSizes[size ?? "small"], className);
    return cloneElement(icon, { className, ...newProps });
};
