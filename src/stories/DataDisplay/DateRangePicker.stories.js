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
    const [value, setValue] = useState({ from: new Date("2022-02-03"), to: new Date("2022-03-08") });

    return <DatePicker variant="range" value={value} onChange={setValue} timezoneName="America/Los_Angeles"/>;
};

export const RelativeDateRanges = () => {
    const [value, setValue] = useState({ from: new Date("2022-03-03"), to: new Date("2022-04-08") });

    return (
        <div className="flex w-3/4 flex-col">
            <DatePicker
                shouldShowYearPicker
                shouldShowRelativeRanges
                value={value}
                variant="range"
                onChange={setValue}
                onSubmitDateRange={console.log}
                timezoneName={"Pacific/Pago_Pago"}
            />
        </div>
    );
};

export const DateRangeWithInput = ({ shouldShowRelativeRanges, ranges }) => {
    const defaultValue = { from: today, to: dayjs(today).add(7, "days").toDate() };
    const [value, setValue] = useState(defaultValue);

    const handleChange = (newValue) => {
        setValue(newValue);
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
                <div className="w-75 cursor-pointer bg-gray-lighter p-3">
                    {value.from ? dayjs(value.from).format("LL") : "Pending"}
                    &nbsp;to&nbsp;
                    {value.to ? dayjs(value.to).format("LL") : "Pending"}
                </div>
            </DatePickerPopover>
        </div>
    );
};

export default DateRangePickerStories;
