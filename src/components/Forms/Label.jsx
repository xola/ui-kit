import clsx from "clsx";
import React from "react";
import PropTypes from "prop-types";

export const Label = ({ isDisabled = false, className, ...rest }) => {
    return (
        <label
            className={clsx(
                "ui-label",
                className,
                "mb-1 block text-sm font-bold",
                isDisabled ? "text-gray" : "text-black",
            )}
            {...rest}
        />
    );
};

Label.propTypes = {
    isDisabled: PropTypes.bool,
    className: PropTypes.string,
};
