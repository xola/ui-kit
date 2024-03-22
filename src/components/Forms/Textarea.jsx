import clsx from "clsx";
import PropTypes from "prop-types";
import React, { forwardRef } from "react";
import { BaseInput } from "./BaseInput";
import TextareaAutosize from 'react-textarea-autosize';

export const Textarea = forwardRef(({ className, value, rows = 2, ...rest }, ref) => {
    return (
        <BaseInput
            ref={ref}
            as={autoSize ? TextareaAutosize : "textarea"}
            value={value}
            className={clsx("ui-textarea", className)}
            rows={rows}
            {...rest}
        />
    );
});

Textarea.propTypes = {
    ...BaseInput.propTypes,
    rows: PropTypes.number,
    autoSize: PropTypes.bool, 
};

Textarea.defaultProps = {
    rows: 2,
};
