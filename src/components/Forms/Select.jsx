import React from "react";
import ReactSelect from "react-select";
import "./Select.css";

export const Select = (props) => {
    return <ReactSelect className="ui-select" classNamePrefix="ui-select" {...props} />;
};
