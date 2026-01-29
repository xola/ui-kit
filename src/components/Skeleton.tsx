import React from "react";
import cn from "../helpers/classnames";
import styles from "./Skeleton.module.css";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    style?: React.CSSProperties;
    height?: number | string;
    shouldAnimate?: boolean;
    children?: React.ReactNode;
    classNames?: {
        container?: string;
        shimmer?: string;
        text?: string;
    };
}

export const Skeleton = ({
    style,
    height = 300,
    shouldAnimate = true,
    children,
    classNames = {},
    ...rest
}: SkeletonProps) => {
    return (
        <div
            className={cn(
                "ui-skeleton",
                "relative flex items-center justify-center overflow-hidden rounded border border-gray-lighter bg-gray-lighter",
                classNames.container,
            )}
            style={{ height, ...style }}
            {...rest}
        >
            {shouldAnimate ? (
                <div className={cn(styles.shimmer, "absolute h-full w-full", classNames.shimmer)} />
            ) : null}
            <div className={cn("text-gray", classNames.text)}>{children}</div>
        </div>
    );
};
