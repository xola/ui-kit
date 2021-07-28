import PropTypes from "prop-types";
import React from "react";
import { BaseInput } from "./BaseInput";

export const Select = ({ isNative = false, ...rest }) => {
    return <BaseInput as="select" {...rest} />;
};

Select.propTypes = {
    ...BaseInput.propTypes,
    isNative: PropTypes.bool,
};
