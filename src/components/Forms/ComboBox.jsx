import React from "react";
import Select from "react-select";
import "./ComboBox.css";

export const ComboBox = (props) => {
    return <Select className="ui-combo-box" classNamePrefix="ui-combo-box" {...props} />;
};
