import PropTypes from "prop-types";
import React from "react";
import cn from "../helpers/classnames";
import styles from "./Skeleton.module.css";

export const Skeleton = ({ style, height = 300, shouldAnimate = true, children, classNames = {}, ...rest }) => {
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

Skeleton.propTypes = {
    style: PropTypes.object,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    shouldAnimate: PropTypes.bool,
    classNames: PropTypes.object,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
