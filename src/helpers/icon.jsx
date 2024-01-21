import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { iconSizes } from "../icons/iconSizes";

export const createIcon = (Icon) => {
    const IconContainer = ({ size = "small", className, ...rest }) => {
        return <Icon className={clsx(iconSizes[size], "-top-0.25 relative inline-block", className)} {...rest} />;
    };

    IconContainer.propTypes = {
        size: PropTypes.oneOf(Object.keys(iconSizes)),
        className: PropTypes.string,
    };

    return IconContainer;
};
