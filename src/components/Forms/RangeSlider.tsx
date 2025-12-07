import clsx from "clsx";
import Nouislider from "nouislider-react";
import React from "react";
import "nouislider/distribute/nouislider.css";
import "./RangeSlider.css";

interface TooltipFormatter {
    from: (value: number) => number;
    to: (value: number) => string;
}

export interface RangeSliderProps {
    values: number[];
    min: number;
    max: number;
    isDisabled?: boolean;
    shouldConnectHandles?: boolean;
    step?: number;
    isTooltipEnabled?: boolean;
    tooltipCustomFormatter?: TooltipFormatter[] | null;
    tooltipSuffix?: string;
    className?: string;
    onChange?: (values: number[], handle: number) => void;
}

/**
 * @param {string?}     props.className                 Class name to apply to the Range slider input.
 * @param {number[]}    props.values                    Initial values to be display on the slider input.
 * @param {number}      props.min                       Slider Minimum value.
 * @param {number}      props.max                       Slider Maximum value.
 * @param {boolean?}    props.isDisabled                To disabled the range slider.
 * @param {boolean?}    props.shouldConnectHandles      To Display colored bars between handles.
 * @param {number?}     props.step                      Increament / decrement slider input by this Step count.
 * @param {boolean?}    props.isTooltipEnabled          Show tooltip on slider.
 * @param {object[]?}   props.tooltipCustomFormatter    Custom tooltip formatter.
 * @param {string?}     props.tooltipSuffix             Suffix to be added to the tooltip.
 * @param {Function?}   props.onChange                  Debounced callback when range slider is changed.
 */
export const RangeSlider = ({
    values,
    min,
    max,
    isDisabled = false,
    shouldConnectHandles = false,
    step = 1,
    isTooltipEnabled = true,
    tooltipCustomFormatter = null,
    tooltipSuffix,
    className,
    onChange,
}: RangeSliderProps) => {
    const tooltipFormatter =
        tooltipCustomFormatter ??
        values.map(() => {
            return {
                from: (value: number) => value,
                to: (value: number) => `${Math.round(value)}${tooltipSuffix ?? ""}`,
            };
        });

    return (
        <Nouislider
            className={clsx("ui-range-slider", className)}
            connect={shouldConnectHandles}
            disabled={isDisabled}
            start={values}
            range={{ min, max }}
            step={step}
            tooltips={isTooltipEnabled ? tooltipFormatter : false}
            onChange={onChange}
        />
    );
};
