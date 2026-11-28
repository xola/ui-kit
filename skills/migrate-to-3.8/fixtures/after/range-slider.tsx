import { RangeSlider } from "@xola/ui-kit";
import React from "react";

const formatTooltip = (value: number) => `${value}h`;

export const ReminderSlider = ({ values, onChange }: { values: number[]; onChange: (next: number[]) => void }) => (
    <div className="reminder-slider">
        <RangeSlider
            values={values}
            min={0}
            max={72}
            tooltipPlacement={["bottom", "top", "bottom"]}
            formatTooltip={formatTooltip}
            onChange={onChange}
        />
    </div>
);
