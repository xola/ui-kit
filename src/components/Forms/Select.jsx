import PropTypes from "prop-types";
import React from "react";
import { BaseInput } from "./BaseInput";

// TODO: Use `isNative` after implementing custom options.
// eslint-disable-next-line no-unused-vars
export const Select = ({ isNative = false, ...rest }) => {
    return <BaseInput as="select" {...rest} />;
};

Select.propTypes = {
    ...BaseInput.propTypes,
    isNative: PropTypes.bool,
};
