import clsx from "clsx";
import PropTypes from "prop-types";
import React, { forwardRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { BaseInput } from "./BaseInput";

export const Textarea = forwardRef(({ className, value, shouldAutoSize = false, rows = 2, ...rest }, ref) => {
    return (
        <BaseInput
            ref={ref}
            as={shouldAutoSize ? TextareaAutosize : "textarea"}
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
    shouldAutoSize: PropTypes.bool,
};

Textarea.defaultProps = {
    rows: 2,
    shouldAutoSize: false,
};
