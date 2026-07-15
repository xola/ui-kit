import PropTypes from "prop-types";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import Select, { components } from "react-select";
import CreatableSelect from "react-select/creatable";
import cn from "../../helpers/classnames";
import { Tooltip } from "../Tooltip";
import "./ComboBox.css";

// TODO: Common parameters should be defined in stories like `options` and `defaultValue`
export const ComboBox = forwardRef(({ isCreatable = false, className = "", isError = false, ...rest }, ref) => {
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
                          MultiValueLabel: CustomMultiValue,
                      }
                    : null
            }
            {...rest}
        />
    );
});

const { MultiValueLabel } = components;

const CustomMultiValue = (props) => {
    const labelRef = useRef(null);
    const [isTooltipDisabled, setIsTooltipDisabled] = useState(true);

    useEffect(() => {
        if (labelRef.current) {
            const isOverflowing = labelRef.current.offsetWidth > labelRef.current.offsetParent.offsetWidth;
            setIsTooltipDisabled(!isOverflowing);
        }
    }, [props.data.label]);

    return (
        <MultiValueLabel {...props}>
            <Tooltip disabled={isTooltipDisabled} maxWidth="none" content={<span>{props.data.label}</span>}>
                <span ref={labelRef}>{props.data.label}</span>
            </Tooltip>
        </MultiValueLabel>
    );
};

ComboBox.propTypes = {
    // eslint-disable-next-line react/require-default-props -- default set via default param, not defaultProps
    className: PropTypes.string,
    // eslint-disable-next-line react/require-default-props -- default set via default param, not defaultProps
    isError: PropTypes.bool,
};
