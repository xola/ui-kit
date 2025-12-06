import clsx from "clsx";
import React, { ComponentPropsWithoutRef, FC } from "react";
import { iconSizes } from "./iconSizes";

type IconSize = keyof typeof iconSizes;

interface IconProps extends ComponentPropsWithoutRef<"svg"> {
    size?: IconSize;
    className?: string;
}

export const createIcon = (Icon: FC<ComponentPropsWithoutRef<"svg">>) => {
    const IconContainer: FC<IconProps> = ({ size = "small", className, ...rest }) => {
        return <Icon className={clsx(iconSizes[size], "relative -top-0.25 inline-block", className)} {...rest} />;
    };

    return IconContainer;
};
