import dayjs from "dayjs";
import { random } from "lodash";
import React, { useState } from "react";
import { DatePicker, DatePickerPopover, theme, Button } from "../..";

const DateRangePickerStories = {
    title: "Data Display/Date & Time/Date Range Picker",
    component: DatePicker,
    parameters: {
        docs: {
            description: {
                component:
                    "Rendering a date *range* picker with various functionality based on [React Day Picker](https://react-day-picker.js.org) library",
            },
        },
    },
};

const today = dayjs().toDate();

export const Default = () => {
    const [value, setValue] = useState({ from: null, to: null });

    return (
        <div className="h-[480px] w-full">
            <DatePicker variant="range" value={value} onChange={setValue} />
        </div>
    );
};

export const DateRangeWithInput = () => {
    const [value, setValue] = useState({ from: today, to: dayjs().add(7, "days").toDate() });

    return (
        <div>
            <DatePickerPopover
                variant="range"
                value={value}
                onChange={setValue}
                popoverProps={{ placement: "bottom-start" }}
            >
                <div className="w-75 cursor-pointer bg-gray-lighter p-3">
                    {dayjs(value.from).format("LL")}
                    &nbsp;to&nbsp;
                    {value.to ? dayjs(value.to).format("LL") : "Pending"}
                </div>
            </DatePickerPopover>
        </div>
    );
};

export default DateRangePickerStories;
