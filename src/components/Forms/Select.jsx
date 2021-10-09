import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import ReactSelect from "react-select";
import "./Select.css";

export const Select = ({ className, isSearchable = false, ...rest }) => {
    return (
        <ReactSelect
            className={clsx("ui-select", className)}
            isSearchable={isSearchable}
            classNamePrefix="ui-select"
            {...rest}
        />
    );
};

Select.propTypes = {
    className: PropTypes.string,
    isSearchable: PropTypes.bool,
};
