import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Button } from "./Button";

export const ToggleButton = ({ color = "primary", isActive, className, ...rest }) => {
    const { variant, ...newRest } = rest;
    const classNames = clsx(className, isActive && `bg-${color}-lighter border border-${color}-light`); // It's ok because JIT will catch colors from other places

    return <Button color={color} variant="outline" className={classNames} {...newRest} />;
};

ToggleButton.propTypes = {
    color: PropTypes.string,
    isActive: PropTypes.bool.isRequired,
    className: PropTypes.string,
};
