import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import Select from "react-select";
import "./ComboBox.css";

export const ComboBox = ({ className, ...rest }) => {
    return <Select className={clsx("ui-combo-box", className)} classNamePrefix="ui-combo-box" {...rest} />;
};

ComboBox.propTypes = {
    className: PropTypes.string,
};
