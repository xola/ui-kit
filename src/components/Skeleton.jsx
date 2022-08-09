import clsx from "clsx";
import { range } from "lodash";
import PropTypes from "prop-types";
import React from "react";

export const Skeleton = ({ height = "h-full", children, className, ...rest }) => {
    return (
        <div
            className={clsx(
                "ui-skeleton-new relative flex items-center justify-center overflow-hidden rounded p-2 text-gray-dark before:absolute before:inset-0",
                // The shimmer is keyframes which is defined in tailwind config that goes from left to the right
                "before:-translate-x-full before:animate-[shimmer_4s_infinite]",
                // These define the animation of the gradient from start to finish
                "before:bg-gradient-to-r before:from-transparent before:via-gray-light before:to-transparent",
                // The background on which the gradient is applied. It should be a lighter color than the gradient
                "bg-gray-lighter",
                // This is a border at the top of the div that will animate too
                "before:border-t before:border-gray-light",
                `${height} w-full`,
                className,
            )}
            {...rest}
        >
            {children ?? "Loading..."}
        </div>
    );
};

Skeleton.propTypes = {
    height: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export const SkeletonGrid = ({ grid = [3, 2], classNames = {} }) => {
    const [horizontalCount, verticalCount] = grid;
    const horizontalClasses = `grid grid-cols-${horizontalCount} gap-x-2`;
    const verticalClasses = `grid grid-rows-${verticalCount} gap-y-2`;

    const defaultParentClassNames = ""; // TODO: For later
    const parentClassName = classNames.parent ?? defaultParentClassNames;

    return (
        <div className={clsx("flex flex-col space-y-1", parentClassName)}>
            <SkeletonPerCount count={horizontalCount} className={horizontalClasses} />
            <SkeletonPerCount count={verticalCount} className={verticalClasses} />
        </div>
    );
};

const SkeletonPerCount = ({ count, className }) => {
    return (
        count > 0 && (
            <div className={className}>
                {range(0, count).map((index) => (
                    <Skeleton />
                ))}
            </div>
        )
    );
};

export const SkeletonIcon = ({ icon, classNames = { skeleton: "h-28 w-28", icon: "h-1/2 w-1/2 text-gray" } }) => {
    const adjustedIcon = React.cloneElement(icon, { className: classNames.icon });
    return <Skeleton className={classNames.skeleton}>{adjustedIcon}</Skeleton>;
};
