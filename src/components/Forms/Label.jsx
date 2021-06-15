import clsx from "clsx";
import React from "react";
import PropTypes from "prop-types";

export const Label = ({ className, ...rest }) => {
    return <label className={clsx(className, "block text-sm text-black font-bold mb-1")} {...rest} />;
};

Label.propTypes = {
    className: PropTypes.string,
};
