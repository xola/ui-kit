import cn from "../../helpers/classnames";
import PropTypes from "prop-types";
import React, { forwardRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { BaseInput } from "./BaseInput";

export const Textarea = forwardRef(({ className, value, shouldAutoSize = false, rows = 2, ...rest }, ref) => {
    return shouldAutoSize ? (
        // TextareaAutosize has a few special props like minRows and maxRows instead of rows field so using rows field to feed the minRows prop. See full list here https://github.com/Andarist/react-textarea-autosize?tab=readme-ov-file#props
        <BaseInput
            ref={ref}
            as={TextareaAutosize}
            value={value}
            minRows={rows}
            className={cn("ui-textarea", className)}
            {...rest}
        />
    ) : (
        <BaseInput
            ref={ref}
            as="textarea"
            value={value}
            rows={rows}
            className={cn("ui-textarea", className)}
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
