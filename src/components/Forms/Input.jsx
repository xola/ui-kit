import PropTypes from "prop-types";
import React, { forwardRef } from "react";
import cn from "../../helpers/classnames";
import { BaseInput } from "./BaseInput";

export const Input = forwardRef(({ className, type = "text", ...rest }, ref) => {
    return <BaseInput ref={ref} as="input" className={cn("ui-input", className)} type={type} {...rest} />;
});

Input.displayName = "Input";

Input.propTypes = {
    ...BaseInput.propTypes,
    type: PropTypes.string,
};
