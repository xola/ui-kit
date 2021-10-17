import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import styles from "./Skeleton.module.css";

export const Skeleton = ({ style, height = 300, shouldAnimate = true, children, classes = {}, ...rest }) => {
    return (
        <div
            className={clsx(
                "ui-skeleton",
                "relative flex items-center justify-center bg-gray-lighter overflow-hidden rounded border border-gray-lighter",
                classes.container,
            )}
            style={{ height, ...style }}
            {...rest}
        >
            {shouldAnimate ? <div className={clsx(styles.shimmer, "absolute w-full h-full", classes.shimmer)} /> : null}
            <div className={clsx("text-gray", classes.text)}>{children}</div>
        </div>
    );
};

Skeleton.propTypes = {
    style: PropTypes.object,
    height: PropTypes.string,
    shouldAnimate: PropTypes.bool,
    classes: PropTypes.object,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
