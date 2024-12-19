import cn from "./classnames";
import PropTypes from "prop-types";
import React from "react";
import { iconSizes } from "./iconSizes";

export const createIcon = (Icon) => {
    const IconContainer = ({ size = "small", className, ...rest }) => {
        return <Icon className={cn(iconSizes[size], "relative -top-0.25 inline-block", className)} {...rest} />;
    };

    IconContainer.propTypes = {
        size: PropTypes.oneOf(Object.keys(iconSizes)),
        className: PropTypes.string,
    };

    return IconContainer;
};
