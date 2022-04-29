import clsx from "clsx";
import PropTypes from "prop-types";
import React, { forwardRef } from "react";
import { BaseInput } from "./BaseInput";

export const Input = forwardRef(({ className, type = "text", ...rest }, reference) => {
    return <BaseInput as="input" className={clsx("ui-input", className)} type={type} {...rest} ref={reference} />;
});

Input.propTypes = {
    ...BaseInput.propTypes,
    type: PropTypes.string,
};
