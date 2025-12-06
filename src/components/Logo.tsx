import clsx from "clsx";
import React from "react";

const sizes = {
    small: "w-10 h-10",
    medium: "w-16 h-16",
    large: "w-20 h-20",
} as const;

type LogoSize = keyof typeof sizes;

export interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    readonly size?: LogoSize;
    readonly className?: string;
}

const LogoComponent = ({ size = "small", className, ...rest }: LogoProps) => {
    return <img className={clsx("ui-logo", className, "inline-block rounded object-cover", sizes[size])} {...rest} />;
};

export const Logo = Object.assign(LogoComponent, { sizes });
