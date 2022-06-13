import dayjs from "dayjs";
import React, { useState } from "react";
import { DatePicker, DatePickerPopover } from "../..";

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
    args: {
        shouldShowRelativeRanges: "boolean",
        ranges: ["day", "week", "month", "quarter", "year"],
    },
    argTypes: {
        shouldShowRelativeRanges: {
            control: { type: "boolean" },
            table: {
                defaultValue: { summary: true },
            },
        },
        ranges: {
            control: { type: "object" },
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

export const DateRangeWithInput = ({ shouldShowRelativeRanges, ranges }) => {
    const [value, setValue] = useState({ from: today, to: dayjs().add(7, "days").toDate() });
    return (
        <div>
            <DatePickerPopover
                variant="range"
                value={value}
                popoverProps={{ placement: "bottom-start" }}
                shouldShowRelativeRanges={shouldShowRelativeRanges}
                ranges={ranges}
                onChange={setValue}
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
