import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { BaseInput } from "./BaseInput";
import TextareaAutosize from 'react-textarea-autosize';

export const Textarea = ({ className, rows = 2, autoSize, ...rest }) => {
    return <BaseInput as={autoSize ? TextareaAutosize : "textarea"} className={clsx("ui-textarea", className)} rows={rows} {...rest} />;
};

Textarea.propTypes = {
    ...BaseInput.propTypes,
    rows: PropTypes.number,
    autoSize: PropTypes.bool, 
};
