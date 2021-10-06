import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { BaseInput } from "./BaseInput";

export const Input = ({ className, type = "text", ...rest }) => {
    return <BaseInput as="input" className={clsx("ui-input", className)} type={type} {...rest} />;
};

Input.propTypes = {
    ...BaseInput.propTypes,
    type: PropTypes.string,
};
