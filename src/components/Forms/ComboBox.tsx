import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import ReactSelect, { Props as SelectProps, components, MultiValueGenericProps } from "react-select";
import CreatableSelect from "react-select/creatable";
import "./ComboBox.css";
import { Tooltip } from "../Tooltip";

export interface ComboBoxProps extends SelectProps {
    isCreatable?: boolean;
    className?: string;
    isError?: boolean;
}

export const ComboBox = ({ isCreatable = false, className, isError, ...rest }: ComboBoxProps) => {
    const SelectType = isCreatable ? CreatableSelect : ReactSelect;
    return (
        <SelectType
            className={clsx("ui-combo-box", isError && "border-danger", className)}
            classNamePrefix="ui-combo-box"
            components={
                isCreatable
                    ? {
                          IndicatorsContainer: () => null,
                          Menu: () => null,
                          MultiValueLabel: CustomMultiValue,
                      }
                    : undefined
            }
            {...rest}
        />
    );
};

const { MultiValueLabel } = components;

const CustomMultiValue = (props: MultiValueGenericProps) => {
    const labelRef = useRef<HTMLSpanElement>(null);
    const [isTooltipDisabled, setIsTooltipDisabled] = useState(true);

    useEffect(() => {
        if (labelRef.current && labelRef.current.offsetParent) {
            const isOverflowing = labelRef.current.offsetWidth > labelRef.current.offsetParent.clientWidth;
            setIsTooltipDisabled(!isOverflowing);
        }
    }, [props.data.label]);

    return (
        <MultiValueLabel {...props}>
            <Tooltip disabled={isTooltipDisabled} maxWidth="none" content={<span>{props.data.label}</span>} className="">
                <span ref={labelRef}>{props.data.label}</span>
            </Tooltip>
        </MultiValueLabel>
    );
};
