import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

export const Counter = ({ className, ...rest }) => {
    return (
        <span
            className={clsx(
                "ui-counter",
                "px-2 py-1 font-semibold inline-flex items-center justify-center rounded-full bg-danger-dark text-white leading-none",
                className,
            )}
            {...rest}
        />
    );
};

Counter.propTypes = {
    className: PropTypes.string,
};
