import PropTypes from "prop-types";
import React from "react";
import cn from "../../helpers/classnames";
import { Button } from "./Button";

export const SecondaryButton = ({
    type = "button",
    size = "medium",
    disabled = false,
    className,
    children,
    ...rest
}) => (
    <Button
        type={type}
        size={size}
        disabled={disabled}
        variant="outline"
        color="secondary"
        className={cn(disabled ? "pointer-events-none" : "pointer-events-auto", className)}
        {...rest}
    >
        {children}
    </Button>
);

SecondaryButton.propTypes = {
    ...Button.propTypes,
    // eslint-disable-next-line react/boolean-prop-naming
    disabled: PropTypes.bool,
};
