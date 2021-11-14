import clsx from "clsx";
import React, { HTMLAttributes } from "react";
import { iconSizes } from "../icons/iconSizes";

interface IconContainerProps extends HTMLAttributes<HTMLElement> {
    size?: keyof typeof iconSizes;
}

type IconType = (props: HTMLAttributes<HTMLElement>) => JSX.Element;

export const createIcon = (Icon: IconType) => {
    return ({ size = "small", className, ...rest }: IconContainerProps) => {
        return <Icon className={clsx(iconSizes[size], "inline-block", className)} {...rest} />;
    };
};
