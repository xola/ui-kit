import { RangeSlider } from "@xola/ui-kit";
import React from "react";
import "./range-slider.css";

const TOOLTIP_FORMATTER = { from: (value: number) => value, to: (value: number) => `${value}h` };

export const ReminderSlider = ({ values, onChange }: { values: number[]; onChange: (next: number[]) => void }) => {
    const tooltipCustomFormatter = values.map(() => TOOLTIP_FORMATTER);

    const handleChange = (next: string[]) => {
        onChange(next.map(Number));
    };

    return (
        <div className="reminder-slider">
            <RangeSlider
                values={values}
                min={0}
                max={72}
                tooltipCustomFormatter={tooltipCustomFormatter}
                onChange={handleChange}
            />
        </div>
    );
};
