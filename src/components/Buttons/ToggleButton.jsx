import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { Button } from "./Button";
import "./ToggleButton.css";

export const ToggleButton = ({ color = "primary", variant = "outline", isActive, className, ...rest }) => {
    return (
        <Button
            color={color}
            variant={variant}
            className={clsx(
                "ui-toggle-button text-black",
                isActive ? `ui-toggle-button-${variant}-${color}` : "border !border-gray-light",
                className,
            )}
            {...rest}
        />
    );
};

ToggleButton.propTypes = {
    ...Button.propTypes,
    isActive: PropTypes.bool.isRequired,
};
