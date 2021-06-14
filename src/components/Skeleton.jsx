import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import styles from "./Skeleton.module.css";

export const Skeleton = ({ className, style, height = 300, isAnimate = true, children, ...rest }) => {
    return (
        <div
            className={clsx(
                className,
                "relative flex items-center justify-center bg-gray-lighter overflow-hidden rounded border border-gray-lighter",
            )}
            style={{ height, ...style }}
            {...rest}
        >
            {isAnimate ? <div className={clsx(styles.shimmer, "absolute w-full h-full")} /> : null}
            <div className="text-gray">{children}</div>
        </div>
    );
};

Skeleton.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    height: PropTypes.number,
    isAnimate: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
