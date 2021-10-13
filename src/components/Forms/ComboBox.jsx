import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import Select from "react-select";
import "./ComboBox.css";

export const ComboBox = ({ className, isError, ...rest }) => {
    return (
        <Select
            className={clsx("ui-combo-box", isError && "border-danger", className)}
            classNamePrefix="ui-combo-box"
            {...rest}
        />
    );
};

ComboBox.propTypes = {
    className: PropTypes.string,
    isError: PropTypes.bool,
};
