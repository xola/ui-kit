import React, { useState, useRef, useCallback, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { Handle } from "./Handle";
import { Knob } from "./Knob";
import { Rail } from "./Rail";
import { sortAsc, valueToPosition, positionToValue } from "./utils";
import "./Slider.css";

export const RangeSlider = ({ values, min, max, knobs, step, className, classNames = {}, onChange, ...rest }) => {
    const [activeHandleIndex, setActiveHandleIndex] = useState(null);
    const sliderRef = useRef();

    useEffect(() => {
        document.addEventListener("mousemove", mouseMoveHandler);
        document.addEventListener("touchmove", touchMoveHandler);
        document.addEventListener("mouseup", clickEndHandler);
        document.addEventListener("touchend", clickEndHandler);

        return () => {
            document.removeEventListener("mousemove", mouseMoveHandler);
            document.removeEventListener("touchmove", touchMoveHandler);
            document.removeEventListener("mouseup", clickEndHandler);
            document.removeEventListener("touchend", clickEndHandler);
        };
    }, [activeHandleIndex]);

    // Coordinates, in pixels, of the slider component in the DOM.
    const getSliderCoordinates = useCallback(() => {
        return sliderRef.current !== null
            ? sliderRef.current.getBoundingClientRect()
            : { left: null, right: null, top: null, bottom: null };
    }, [sliderRef]);

    // The length of this slider component in pixels.
    const sliderPixelLength = useCallback(() => {
        const { left, right } = getSliderCoordinates();
        return right - left;
    }, [getSliderCoordinates]);

    const getHandlePositions = values.map((val) => {
        // These checks ensure handles never fly off the rails
        if (val > max) return 100;
        else if (val < min) return 0;
        else return valueToPosition(val, min, max, step);
    });

    const getColoredRailPositions = useMemo(() => {
        if (!rest.isColoredRailEnabled || getHandlePositions.length < 1) {
            return null;
        }

        if (getHandlePositions.length === 1) {
            return [0, getHandlePositions[0]];
        } else {
            const sortedHandlePositions = sortAsc(getHandlePositions);
            return [sortedHandlePositions[0], sortedHandlePositions.slice(-1)];
        }
    }, [getHandlePositions, rest.isColoredRailEnabled]);

    const snapToThresholds = () => {
        return knobs
            .filter(({ snapToThreshold }) => !isNaN(snapToThreshold) && snapToThreshold > 0)
            .map(({ position, snapToThreshold }) => [position, snapToThreshold]);
    };

    // Component methods
    const getKnobIsColored = (position) => {
        if (getColoredRailPositions === null) {
            return false;
        }

        const [startPos, endPos] = getColoredRailPositions;

        return startPos <= position && endPos >= position;
    };

    const calculateSnappedPosition = (position) => {
        snapToThresholds().forEach(([snapToPos, threshold]) => {
            const lowerBound = snapToPos - threshold;
            const upperBound = snapToPos + threshold;
            if (position >= lowerBound && position <= upperBound) {
                position = snapToPos;
            }
        });

        return position;
    };

    const drag = (cursorX) => {
        if (activeHandleIndex !== null) {
            const { isSnapToEnabled } = rest;

            // Convert the cursor's X position from pixels to a percentage of the slider's width
            const { left } = getSliderCoordinates();
            let cursorPosition = ((cursorX - left) / sliderPixelLength()) * 100;

            if (isSnapToEnabled) {
                cursorPosition = calculateSnappedPosition(cursorPosition);
            }

            let cursorValue;
            if (cursorPosition < 0) {
                cursorValue = min;
            } else if (cursorPosition > 100) {
                cursorValue = max;
            } else {
                // Convert from percentage-based position back to true value
                cursorValue = positionToValue(cursorPosition, min, max, step);
            }

            let newValues = [...values];
            newValues[activeHandleIndex] = cursorValue;

            onChange(newValues);
        }
    };

    // Event handlers
    const clickEndHandler = () => setActiveHandleIndex(null);

    const mouseMoveHandler = (e) => drag(e.pageX);

    const touchMoveHandler = (e) => {
        if (e.touches && e.touches.length > 0) {
            drag(e.touches[0].pageX);
        }
    };

    const handles = getHandlePositions.map((position, handleIndex) => (
        <Handle
            position={position}
            value={positionToValue(position, min, max, step)}
            tooltipLabel={rest.tooltipLabel}
            isActive={activeHandleIndex === handleIndex}
            onMouseDown={() => setActiveHandleIndex(handleIndex)}
            onTouchStart={() => setActiveHandleIndex(handleIndex)}
            key={`handle_${handleIndex}`}
        />
    ));

    const knobsComponent = knobs.map(({ position, type }) => (
        <Knob position={position} type={type} isColored={getKnobIsColored(position)} key={`knob_${position}`} />
    ));

    return (
        <div className="ui-range-slider" ref={sliderRef}>
            <Rail coloredRailPositions={getColoredRailPositions} />
            {handles}
            {knobsComponent}
        </div>
    );
};

RangeSlider.defaultProps = {
    isColoredRailEnabled: true,
    isSnapToEnabled: false,
    knobs: [],
    tooltipLabel: "",
    step: 1,
};

RangeSlider.propTypes = {
    values: PropTypes.arrayOf(PropTypes.number).isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    isColoredRailEnabled: PropTypes.bool,
    isSnapToEnabled: PropTypes.bool,
    knobs: PropTypes.arrayOf(
        PropTypes.shape({
            position: PropTypes.number.isRequired,
            snapToThreshold: PropTypes.number,
        }),
    ),
    tooltipLabel: PropTypes.string,
    step: PropTypes.number,
    onChange: PropTypes.func,
};
