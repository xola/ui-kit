import classNames from "classnames";
import PropTypes from "prop-types";
import React, { Children, cloneElement } from "react";
import styles from "./Stepper.module.scss";

const Stepper = ({ children, size = 26, className, ...rest }) => {
    return (
        <div className={classNames(className, "mx-auto")} {...rest}>
            <div className={classNames(styles.text, "d-flex align-items-center justify-content-between")}>
                {Children.map(children, (child, index) =>
                    cloneElement(child, { size, last: Children.count(children) === index + 1 }),
                )}
            </div>
        </div>
    );
};

Stepper.propTypes = {
    /**
     * Size of the circle.
     */
    size: PropTypes.number,
};

export default Stepper;
