import clsx from "clsx";
import React from "react";
import PropTypes from "prop-types";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import "./RangeSlider.css";

export const RangeSlider = ({
    values,
    min,
    max,
    isDisabled = false,
    isConnectHandles = false,
    step = 1,
    showToolTip = true,
    tooltipLabel,
    className,
    onChange,
}) => {
    return (
        <Nouislider
            className={clsx("ui-range-slider", className)}
            connect={isConnectHandles}
            disabled={isDisabled}
            start={values}
            range={{
                min,
                max,
            }}
            step={step}
            tooltips={showToolTip}
            format={{
                from: (value) => value,
                to: (value) => value.toFixed() + tooltipLabel,
            }}
            onChange={onChange}
        />
    );
};

RangeSlider.propTypes = {
    values: PropTypes.arrayOf(PropTypes.number).isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    isDisabled: PropTypes.bool,
    isConnectHandles: PropTypes.bool,
    showToolTip: PropTypes.bool,
    tooltipLabel: PropTypes.string,
    step: PropTypes.number,
    onChange: PropTypes.func,
    className: PropTypes.string,
};
