import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { BaseInput } from "./BaseInput";

export const Input = ({ className, type = "text", ...rest }) => {
    const preventFirstZero = (event) => {
        if (event.target.value.charAt(0) === "0" && type === "number") {
            event.target.value = event.target.value.slice(1);
        }
    };

    return (
        <BaseInput
            as="input"
            className={clsx("ui-input", className)}
            type={type}
            onKeyPress={(e) => preventFirstZero(e)}
            {...rest}
        />
    );
};

Input.propTypes = {
    ...BaseInput.propTypes,
    type: PropTypes.string,
};
