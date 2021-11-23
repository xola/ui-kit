import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import "./ComboBox.css";

// TODO: Common parameters should be defined in stories like `options` and `defaultValue`
export const ComboBox = ({ isCreatable = false, className, isError, ...rest }) => {
    const SelectType = isCreatable ? CreatableSelect : Select;
    return (
        <SelectType
            className={clsx("ui-combo-box", isError && "border-danger", className)}
            classNamePrefix="ui-combo-box"
            components={
                isCreatable
                    ? {
                          IndicatorsContainer: () => null,
                          Menu: () => null,
                      }
                    : null
            }
            {...rest}
        />
    );
};

ComboBox.propTypes = {
    className: PropTypes.string,
    isError: PropTypes.bool,
};
