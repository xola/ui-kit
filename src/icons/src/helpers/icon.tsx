import clsx from "clsx";
import React from "react";
import { iconSizes, IconSize } from "./iconSizes";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: IconSize;
}

export type IconComponent = React.FC<IconProps> & { tags?: string[] };

export const createIcon = (Icon: (props: IconProps) => JSX.Element): IconComponent => {
    const IconContainer: IconComponent = ({ size = "small", className, ...rest }) => {
        return <Icon className={clsx(iconSizes[size], "relative -top-0.25 inline-block", className)} {...rest} />;
    };

    return IconContainer;
};
