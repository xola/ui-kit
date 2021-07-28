import PropTypes from "prop-types";
import React from "react";
import { BaseInput } from "./BaseInput";

export const Input = ({ type = "text", ...rest }) => {
    return <BaseInput as="input" type={type} {...rest} />;
};

Input.propTypes = {
    ...BaseInput.propTypes,
    type: PropTypes.string,
};
