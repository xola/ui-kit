import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

export const Counter = ({ className, ...rest }) => {
    return (
        <span
            className={clsx(
                "ui-counter",
                "inline-flex items-center justify-center rounded-full bg-danger-dark px-2 py-1 font-semibold leading-none text-white",
                className,
            )}
            {...rest}
        />
    );
};

Counter.propTypes = {
    className: PropTypes.string,
};
