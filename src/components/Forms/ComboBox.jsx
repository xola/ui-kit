import PropTypes from "prop-types";
import React, { forwardRef } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import cn from "../../helpers/classnames";
import "./ComboBox.css";

// TODO: Common parameters should be defined in stories like `options` and `defaultValue`
export const ComboBox = forwardRef(({ isCreatable = false, className, isError, ...rest }, ref) => {
    const SelectType = isCreatable ? CreatableSelect : Select;
    return (
        <SelectType
            ref={ref}
            className={cn("ui-combo-box", isError && "border-danger", className)}
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
});

ComboBox.propTypes = {
    className: PropTypes.string,
    isError: PropTypes.bool,
};
