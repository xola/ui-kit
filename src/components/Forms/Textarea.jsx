import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { BaseInput } from "./BaseInput";

export const Textarea = ({ className, rows = 2, ...rest }) => {
    return <BaseInput as="textarea" className={clsx("ui-textarea", className)} rows={rows} {...rest} />;
};

Textarea.propTypes = {
    ...BaseInput.propTypes,
    rows: PropTypes.number,
};
