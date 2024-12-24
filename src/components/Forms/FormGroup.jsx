import PropTypes from "prop-types";
import React from "react";
import cn from "../../helpers/classnames";

export const FormGroup = ({ className, ...rest }) => {
    return <div className={cn("ui-form-group", "mb-4", className)} {...rest} />;
};

FormGroup.propTypes = {
    className: PropTypes.string,
};
