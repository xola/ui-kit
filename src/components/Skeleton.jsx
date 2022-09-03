import clsx from "clsx";
import { range } from "lodash";
import PropTypes from "prop-types";
import React from "react";
import styles from "./Skeleton.module.css";

export const Skeleton = ({ height = "h-full", children, className, classNames = {}, ...rest }) => {
    return (
        <div
            className={clsx(
                "ui-skeleton",
                "relative flex items-center justify-center overflow-hidden rounded border border-gray-lighter bg-gray-lighter",
                height,
                className,
            )}
            {...rest}
        >
            <div className={clsx("absolute h-full w-full", styles.shimmer, classNames.shimmer)} />
            {children ?? (
                <div className={clsx("flex h-full w-full items-center justify-center text-gray", classNames.content)}>
                    Loading...
                </div>
            )}
        </div>
    );
};

Skeleton.propTypes = {
    height: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export const SkeletonGrid = ({ grid = [3, 2], classNames = { horizontal: "h-10", vertical: "!h-10" } }) => {
    const [horizontalCount, verticalCount] = grid;
    const horizontalClasses = `grid grid-cols-${horizontalCount} gap-x-2`;
    const verticalClasses = `grid grid-rows-${verticalCount - 1} gap-y-2`;

    const defaultParentClassNames = "h-full";
    const parentClassName = classNames.parent ?? defaultParentClassNames;

    return (
        <div className={clsx("flex flex-col space-y-1", parentClassName)}>
            <SkeletonPerCount count={horizontalCount} className={clsx(horizontalClasses, classNames.horizontal)} />
            <SkeletonPerCount
                count={verticalCount - 1}
                className={clsx(verticalClasses, "h-10")}
                classNames={{ skeleton: classNames.vertical }}
            />
        </div>
    );
};

const SkeletonPerCount = ({ count, className, classNames = {} }) => {
    return (
        count > 0 && (
            <div className={className}>
                {range(0, count).map((index) => (
                    <Skeleton key={index} className={classNames.skeleton} />
                ))}
            </div>
        )
    );
};

export const SkeletonIcon = ({ icon, classNames = { skeleton: "h-28 w-28", icon: "h-1/2 w-1/2 text-gray" } }) => {
    const adjustedIcon = React.cloneElement(icon, { className: classNames.icon });
    return <Skeleton className={classNames.skeleton}>{adjustedIcon}</Skeleton>;
};
