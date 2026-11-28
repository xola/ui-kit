import PropTypes from "prop-types";
import React, { forwardRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import cn from "../../helpers/classnames";
import { BaseInput } from "./BaseInput";

export const Textarea = forwardRef(({ className, shouldAutoSize = false, rows = 2, ...rest }, ref) => {
    // TextareaAutosize has a few special props like minRows and maxRows instead of rows field so using rows field to feed the minRows prop. See full list here https://github.com/Andarist/react-textarea-autosize?tab=readme-ov-file#props
    return (
        <BaseInput
            ref={ref}
            as={shouldAutoSize ? TextareaAutosize : "textarea"}
            {...(shouldAutoSize ? { minRows: rows } : { rows })}
            className={cn("ui-textarea", className)}
            {...rest}
        />
    );
});

Textarea.displayName = "Textarea";

Textarea.propTypes = {
    ...BaseInput.propTypes,
    rows: PropTypes.number,
    shouldAutoSize: PropTypes.bool,
};
