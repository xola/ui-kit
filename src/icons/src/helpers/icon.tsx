import clsx from "clsx";
import React, { type ComponentPropsWithoutRef, type FC } from "react";
import { iconSizes } from "./iconSizes";

type IconSize = keyof typeof iconSizes;

export interface IconProps extends ComponentPropsWithoutRef<"svg"> {
    readonly size?: IconSize;
    readonly className?: string;
}

export interface IconComponent extends FC<IconProps> {
    tags?: string[];
}

export const createIcon = (Icon: FC<ComponentPropsWithoutRef<"svg">>): IconComponent => {
    const IconContainer: FC<IconProps> = ({ size = "small", className, ...rest }) => {
        return <Icon className={clsx(iconSizes[size], "relative -top-0.25 inline-block", className)} {...rest} />;
    };

    return IconContainer as IconComponent;
};
