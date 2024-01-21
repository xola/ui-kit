import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import styles from "./Skeleton.module.css";

export const Skeleton = ({ style, height = 300, shouldAnimate = true, children, classNames = {}, ...rest }) => {
    return (
        <div
            className={clsx(
                "ui-skeleton",
                "border-gray-lighter bg-gray-lighter relative flex items-center justify-center overflow-hidden rounded border",
                classNames.container,
            )}
            style={{ height, ...style }}
            {...rest}
        >
            {shouldAnimate ? (
                <div className={clsx(styles.shimmer, "absolute h-full w-full", classNames.shimmer)} />
            ) : null}
            <div className={clsx("text-gray", classNames.text)}>{children}</div>
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
