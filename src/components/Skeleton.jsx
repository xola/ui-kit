import clsx from "clsx";
import { range } from "lodash";
import PropTypes from "prop-types";
import React from "react";
import styles from "./Skeleton.module.css";

export const Skeleton = ({ height = "h-full", text, children, className, classNames = {}, ...rest }) => {
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
                    {text ?? ""}
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

const gridHorizontal = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
    7: "grid-cols-7",
    8: "grid-cols-8",
};

const gridVertical = {
    1: "grid-rows-1",
    2: "grid-rows-2",
    3: "grid-rows-3",
    4: "grid-rows-4",
    5: "grid-rows-5",
    6: "grid-rows-6",
    7: "grid-rows-7",
    8: "grid-rows-8",
};

export const SkeletonGrid = ({
    grid = [3, 2],
    className = "h-full",
    classNames = { horizontalContainer: "", verticalContainer: "", horizontal: "!h-10", vertical: "!h-10" },
}) => {
    const [horizontalCount, verticalCount] = grid;
    const horizontalClasses = clsx("grid gap-x-2", gridHorizontal[horizontalCount] ?? `grid-cols-${horizontalCount}`);
    const verticalClasses = clsx("grid gap-y-2", gridVertical[verticalCount] ?? `grid-rows-${verticalCount}`);

    return (
        <div className={clsx("flex flex-col space-y-1", className)}>
            <SkeletonPerCount
                count={horizontalCount}
                className={clsx(horizontalClasses, classNames.horizontalContainer)} // Container
                classNames={{ skeleton: classNames.horizontal }} // Skeleton
            />
            <SkeletonPerCount
                count={verticalCount - 1}
                className={clsx(verticalClasses, classNames.verticalContainer)} // Container
                classNames={{ skeleton: classNames.vertical }} // Skeleton
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

export const SkeletonIconOnly = ({ icon, classNames = { skeleton: "h-28 w-28", icon: "h-1/2 w-1/2 text-gray" } }) => {
    if (!icon) {
        return null;
    }

    const adjustedIcon = React.cloneElement(icon, { className: classNames.icon });
    return <Skeleton className={classNames.skeleton}>{adjustedIcon}</Skeleton>;
};
