import clsx from "clsx";
import React from "react";
import PropTypes from "prop-types";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import "./RangeSlider.css";

/**
 * @param {string?}     props.className                 Class name to apply to the Range slider input.
 * @param {number[]}    props.values                    Initial values to be display on the slider input.
 * @param {number}      props.min                       Slider Minimum value.
 * @param {number}      props.max                       Slider Maximum value.
 * @param {boolean?}    props.isDisabled                To disabled the range slider.
 * @param {boolean?}    props.shouldConnectHandles      To Display colored bars between handles.
 * @param {number?}     props.step                      Increament / decrement slider input by this Step count.
 * @param {boolean?}    props.isToolTipEnabled          Show tooltip on slider.
 * @param {object[]?}   props.tooltipCustomFormatter    Custom tooltip formatter.
 * @param {string?}     props.toolTipSuffix             Suffix to be added to the tooltip.
 * @param {Function?}   props.onChange                  Debounced callback when range slider is changed.
 */
export const RangeSlider = ({
    className,
    values,
    min,
    max,
    isDisabled = false,
    shouldConnectHandles = false,
    step = 1,
    isToolTipEnabled = true,
    tooltipCustomFormatter = null,
    toolTipSuffix,
    onChange,
}) => {
    const tooltipFormatter =
        tooltipCustomFormatter ??
        values.map(() => {
            return {
                from: (value) => value,
                to: (value) => Math.round(value) + toolTipSuffix,
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
            tooltips={isToolTipEnabled ? tooltipFormatter : false}
            format={{
                from: (value) => value,
                to: (value) => Math.round(value),
            }}
            onChange={onChange}
        />
    );
};

RangeSlider.propTypes = {
    className: PropTypes.string,
    values: PropTypes.arrayOf(PropTypes.number).isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    isDisabled: PropTypes.bool,
    shouldConnectHandles: PropTypes.bool,
    isToolTipEnabled: PropTypes.bool,
    toolTipSuffix: PropTypes.string,
    tooltipCustomFormatter: PropTypes.arrayOf(
        PropTypes.shape({
            from: PropTypes.func.isRequired,
            to: PropTypes.func.isRequired,
        }),
    ),
    step: PropTypes.number,
    onChange: PropTypes.func,
};
