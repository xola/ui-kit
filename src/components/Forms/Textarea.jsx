import clsx from "clsx";
import PropTypes from "prop-types";
import React, { forwardRef } from "react";
import { BaseInput } from "./BaseInput";

export const Textarea = forwardRef(({ className, value, rows = 2, ...rest }, ref) => {
    return (
        <BaseInput
            ref={ref}
            as="textarea"
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
};

Textarea.defaultProps = {
    rows: 2,
};
