import PropTypes from "prop-types";
import React from "react";
import { BaseInput } from "./BaseInput";

export const Textarea = ({ rows = 2, ...rest }) => {
    return <BaseInput as="textarea" rows={rows} {...rest} />;
};

Textarea.propTypes = {
    ...BaseInput.propTypes,
    rows: PropTypes.number,
};
