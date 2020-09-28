import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import styles from "./MiniStepper.module.scss";

export const MiniStepper = ({ count, value, size, ...rest }) => {
    const dots = [];

    for (let i = 0; i < count; i++) {
        dots.push(
            <span
                style={{ fontSize: size }}
                key={i}
                className={classNames(styles.dot, { [styles.done]: i < value }, "mr-1")}
            >
                &bull;
            </span>,
        );
    }

    return <div {...rest}>{dots}</div>;
};

MiniStepper.propTypes = {
    /**
     * Total number of steps
     */
    count: PropTypes.number.isRequired,

    /**
     * Current step index
     */
    value: PropTypes.number.isRequired,

    /**
     * Size (font size) of each dot
     */
    size: PropTypes.number,
};
