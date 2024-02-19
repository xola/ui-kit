import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

export const Label = ({ isDisabled = false, isError = false, className, ...rest }) => {
    return (
        <label
            className={clsx(
                "ui-label",
                className,
                "mb-1 block text-sm font-bold",
                isError ? "text-danger" : isDisabled ? "text-gray" : "text-black",
            )}
            {...rest}
        />
    );
};

Label.propTypes = {
    isDisabled: PropTypes.bool,
    isError: PropTypes.bool,
    className: PropTypes.string,
};
