import clsx from "clsx";
import PropTypes from "prop-types";
import React, { forwardRef } from "react";
import { BaseInput } from "./BaseInput";

export const Input = forwardRef(({ className, type = "text", value, ...rest }, ref) => {
    return (
        <BaseInput ref={ref} as="input" className={clsx("ui-input", className)} type={type} value={value} {...rest} />
    );
});

Input.defaultProps = {
    ...BaseInput.defaultProps,
    type: PropTypes.string,
};
