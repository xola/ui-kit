import * as Slider from "@radix-ui/react-slider";
import { clamp, isEqual } from "lodash-es";
import PropTypes from "prop-types";
import React, { useState } from "react";
import cn from "../../helpers/classnames";
import "./RangeSlider.css";

const getDefaultFormatter = (tooltipSuffix = "") => {
    return (value) => `${Math.round(value)}${tooltipSuffix}`;
};

const getPlacement = (tooltipPlacement, index) => {
    return Array.isArray(tooltipPlacement) ? (tooltipPlacement[index] ?? "bottom") : tooltipPlacement;
};

/**
 * Semi-controlled: `values` seeds the internal state and is re-applied whenever it changes by deep-equal, so a parent
 * passing a new array with the same numbers does not undo the user's drag. A `key` change remounts as usual.
 *
 * @param {string?}                     props.className             Class name to apply to the slider root.
 * @param {number[]}                    props.values                Values to display, one thumb each. Clamped to [min, max].
 * @param {number}                      props.min                   Slider minimum value.
 * @param {number}                      props.max                   Slider maximum value.
 * @param {boolean?}                    props.isDisabled            Disables the slider.
 * @param {boolean?}                    props.shouldConnectHandles  Display a colored bar between handles.
 * @param {number?}                     props.step                  Increment / decrement by this step.
 * @param {boolean?}                    props.isTooltipEnabled      Show a tooltip on each thumb.
 * @param {string?}                     props.tooltipSuffix         Suffix appended to the default tooltip text.
 * @param {string|string[]?}            props.tooltipPlacement      "top" or "bottom", or one per thumb. Defaults to "bottom".
 * @param {Function?}                   props.formatTooltip         `(value, index) => string`. Replaces the default text and suffix.
 * @param {Function?}                   props.onChange              `(values: number[]) => void`. Called on release or keyboard commit.
 */
export const RangeSlider = ({
    isDisabled = false,
    shouldConnectHandles = false,
    isTooltipEnabled = true,
    values,
    min,
    max,
    step = 1,
    tooltipPlacement = "bottom",
    tooltipSuffix,
    className,
    formatTooltip,
    onChange,
}) => {
    const clampedValues = values.map((value) => clamp(value, min, max));
    const [seededValues, setSeededValues] = useState(clampedValues);
    const [currentValues, setCurrentValues] = useState(clampedValues);

    const isSeedChanged = !isEqual(seededValues, clampedValues);
    if (isSeedChanged) {
        setSeededValues(clampedValues);
        setCurrentValues(clampedValues);
    }

    const format = formatTooltip ?? getDefaultFormatter(tooltipSuffix);

    return (
        <Slider.Root
            className={cn("ui-range-slider", className)}
            disabled={isDisabled}
            min={min}
            max={max}
            step={step}
            value={currentValues}
            onValueChange={setCurrentValues}
            onValueCommit={onChange}
        >
            <Slider.Track className="ui-range-slider-track">
                {shouldConnectHandles && <Slider.Range className="ui-range-slider-range" />}
            </Slider.Track>
            {currentValues.map((value, index) => (
                <Slider.Thumb key={index} className="ui-range-slider-thumb" aria-label={`Value ${index + 1}`}>
                    {isTooltipEnabled && (
                        <span
                            className="ui-range-slider-tooltip"
                            data-placement={getPlacement(tooltipPlacement, index)}
                        >
                            {format(value, index)}
                        </span>
                    )}
                </Slider.Thumb>
            ))}
        </Slider.Root>
    );
};

RangeSlider.propTypes = {
    className: PropTypes.string,
    values: PropTypes.arrayOf(PropTypes.number).isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    isDisabled: PropTypes.bool,
    shouldConnectHandles: PropTypes.bool,
    isTooltipEnabled: PropTypes.bool,
    tooltipSuffix: PropTypes.string,
    tooltipPlacement: PropTypes.oneOfType([
        PropTypes.oneOf(["top", "bottom"]),
        PropTypes.arrayOf(PropTypes.oneOf(["top", "bottom"])),
    ]),
    formatTooltip: PropTypes.func,
    step: PropTypes.number,
    onChange: PropTypes.func,
};
