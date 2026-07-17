import dayjs from "dayjs";
import React, { useState } from "react";
import { expect, waitFor, within } from "storybook/test";
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

const today = dayjs.tz("2022-10-10").toDate();
const handleSubmitDateRange = (e) => {
    console.log("handleSubmitDateRange", { event: e });
};

export const Default = () => {
    const [value, setValue] = useState({ from: new Date("2022-02-03"), to: new Date("2022-03-08") });

    return <DatePicker variant="range" value={value} onChange={setValue} />;
};

Default.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Range variant renders two months side by side
    await expect(canvas.getByText(/February 2022/)).toBeInTheDocument();
    await expect(canvas.getByText(/March 2022/)).toBeInTheDocument();
    await expect(canvasElement.querySelectorAll(".DayPicker-Day--selected").length).toBeGreaterThan(0);
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
                onSubmitDateRange={handleSubmitDateRange}
            />
        </div>
    );
};

RelativeDateRanges.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Relative-range dropdown with grouped options is shown
    await expect(canvas.getByText("Relative Date Range")).toBeInTheDocument();
    const optgroupLabels = [...canvasElement.querySelectorAll("optgroup")].map((group) => group.label);
    await expect(optgroupLabels).toEqual(expect.arrayContaining(["Day", "Week", "Month", "Quarter", "Year"]));
};

export const RelativeDateRangesWithTimeZone = () => {
    const [value, setValue] = useState({ from: new Date("2022-03-03"), to: new Date("2022-04-08") });

    return (
        <div className="flex w-3/4 flex-col">
            <DatePicker
                shouldShowYearPicker
                shouldShowRelativeRanges
                value={value}
                variant="range"
                onChange={setValue}
                timezoneName={"America/Los_Angeles"}
                onSubmitDateRange={handleSubmitDateRange}
            />
        </div>
    );
};

RelativeDateRangesWithTimeZone.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Relative Date Range")).toBeInTheDocument();
    await expect(canvasElement.querySelectorAll(".DayPicker-Day").length).toBeGreaterThan(0);
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

DateRangeWithInput.play = async ({ canvasElement, userEvent }) => {
    await userEvent.click(canvasElement.querySelector(".cursor-pointer"));
    await waitFor(() => expect(canvasElement.ownerDocument.querySelector(".DayPicker")).toBeInTheDocument());
};

export default DateRangePickerStories;
