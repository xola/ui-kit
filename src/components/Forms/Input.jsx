import clsx from "clsx";
import PropTypes from "prop-types";
import React, { forwardRef, useEffect, useRef } from "react";
import { BaseInput } from "./BaseInput";

export const Input = ({ className, type = "text", value, ...rest }) => {
    const inputRef = useRef();

    useEffect(() => {
        console.log(inputRef.current); // Should log the input DOM node
    }, [inputRef]);

    return (
        <BaseInput
            ref={inputRef}
            as="input"
            className={clsx("ui-input", className)}
            type={type}
            value={value}
            {...rest}
        />
    );
};

Input.propTypes = {
    ...BaseInput.propTypes,
    type: PropTypes.string,
};
