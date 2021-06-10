import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

export const NotificationCount = ({ className, ...rest }) => {
    return (
        <span
            className={clsx(
                "px-2 py-1 font-semibold inline-flex items-center justify-center rounded-full bg-red-dark text-white leading-none",
                className,
            )}
            {...rest}
        />
    );
};

NotificationCount.propTypes = {
    className: PropTypes.string,
};
