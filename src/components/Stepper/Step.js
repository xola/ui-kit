import classNames from "classnames";
import React, { Fragment } from "react";
import styles from "./Step.module.scss";
import PropTypes from "prop-types";

const Step = ({ children, last, label, current, done, size }) => {
    return (
        <Fragment>
            <div
                style={{ width: size, height: size, maxWidth: size, maxHeight: size }}
                className={classNames(
                    styles.circle,
                    "d-flex align-items-center justify-content-center rounded-circle border mr-2",
                    { "border-primary bg-primary text-white": current, "border-success bg-success text-white": done },
                )}
            >
                {children}
            </div>

            <div className={classNames(styles.label, { [styles.current]: current, "text-dark": current })}>{label}</div>
            {last ? null : <div className={classNames(styles.line, "mx-4", { "bg-primary": done })} />}
        </Fragment>
    );
};

Step.propTypes = {
    done: PropTypes.bool,
    last: PropTypes.bool,
};

export default Step;
