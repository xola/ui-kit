import * as Slider from "@radix-ui/react-slider";
import { clamp, isEqual } from "lodash-es";
import PropTypes from "prop-types";
import React, { useState } from "react";
import cn from "../../helpers/classnames";
import { warnRemovedProps } from "../../helpers/warnRemovedProps";
import "./RangeSlider.css";

const REMOVED_PROPS = { tooltipCustomFormatter: "use 'formatTooltip(value, index)'" };

const getDefaultFormatter =
    (tooltipSuffix = "") =>
    (value) =>
        `${Math.round(value)}${tooltipSuffix}`;

const getPlacement = (tooltipPlacement, index) => {
    return Array.isArray(tooltipPlacement) ? (tooltipPlacement[index] ?? "bottom") : tooltipPlacement;
};

/**
 * Semi-controlled: `values` and the bounds seed internal state and replace it when their values change. Deep-equal
 * comparison prevents a parent passing a new array with the same numbers from undoing the user's drag. A `key` change remounts as usual.
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
    ...removedProps
}) => {
    warnRemovedProps("RangeSlider", removedProps, REMOVED_PROPS);

    const clampedValues = values.map((value) => clamp(value, min, max));
    const nextSeed = { values, min, max };
    const [seed, setSeed] = useState(nextSeed);
    const [currentValues, setCurrentValues] = useState(clampedValues);

    if (!isEqual(seed, nextSeed)) {
        setSeed(nextSeed);
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
