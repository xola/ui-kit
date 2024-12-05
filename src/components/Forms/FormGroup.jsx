import cn from "../../helpers/classnames";
import PropTypes from "prop-types";
import React from "react";

export const FormGroup = ({ className, ...rest }) => {
    return <div className={cn("ui-form-group", className, "mb-4")} {...rest} />;
};

FormGroup.propTypes = {
    className: PropTypes.string,
};
