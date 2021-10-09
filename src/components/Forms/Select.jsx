import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import ReactSelect from "react-select";
import "./Select.css";

export const Select = ({ className, ...rest }) => {
    return <ReactSelect className={clsx("ui-select", className)} classNamePrefix="ui-select" {...rest} />;
};

Select.propTypes = {
    className: PropTypes.string,
};
