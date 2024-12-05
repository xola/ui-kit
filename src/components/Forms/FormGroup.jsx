import PropTypes from "prop-types";
import React from "react";
import cn from "../../helpers/classnames";

export const FormGroup = ({ className, ...rest }) => {
    return <div className={cn("ui-form-group", className, "mb-4")} {...rest} />;
};

FormGroup.propTypes = {
    className: PropTypes.string,
};
