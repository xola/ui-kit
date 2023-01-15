import dayjs from "dayjs";
import React, { useState } from "react";
import { CalendarIcon, DatePicker, DatePickerPopover } from "../..";

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
        design: {
            name: "Figma",
            type: "figma",
            url: "https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=3063%3A140153",
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

const today = dayjs("2022-10-10").toDate();

export const Default = () => {
    const [value, setValue] = useState({ from: new Date("2022-03-03"), to: new Date("2022-04-08") });

    return (
        <div className="flex w-3/4 flex-col border border-gray-light p-4">
            <p className="text-gray-darker">The above border is added to show the width of 810px on the date picker</p>
            <DatePicker
                shouldShowYearPicker
                shouldShowRelativeRanges
                value={value}
                variant="range"
                onChange={setValue}
                onSubmitDateRange={console.log}
            />
        </div>
    );
};

export const DateRangeWithInput = ({ shouldShowRelativeRanges, ranges }) => {
    const defaultValue = { from: today, to: dayjs(today).add(7, "days").toDate() };
    const [value, setValue] = useState(defaultValue);
    const [displayValue, setDisplayValue] = useState(defaultValue);

    const handleChange = (newValue, displayValue) => {
        setValue(newValue);
        setDisplayValue(displayValue ?? newValue);
    };

    return (
        <div>
            <DatePickerPopover
                variant="range"
                value={value}
                popoverProps={{ placement: "bottom-start" }}
                shouldShowRelativeRanges={!!shouldShowRelativeRanges}
                ranges={ranges}
                onChange={handleChange}
            >
                <div className="flex h-10 w-75 cursor-pointer items-center rounded border border-gray-light p-3">
                    <CalendarIcon className="mr-1" size="medium" />
                    {dayjs(displayValue.from).format("LL")}
                    &nbsp;to&nbsp;
                    {displayValue.to ? dayjs(displayValue.to).format("LL") : "Pending"}
                </div>
            </DatePickerPopover>
        </div>
    );
};

export default DateRangePickerStories;
