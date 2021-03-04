import React, { Component, useState } from "react";
import { Fragment } from "react";
import { DatePicker } from "..";

export default {
    title: "DatePicker",
};

export const Calendar = () => {
    const [selectedValue, setSelectedValue] = useState(new Date("2021-03-17"));
    const handleChange = (value) => {
        setSelectedValue(value);
    };
    return <DatePicker onChange={handleChange} isDatePicker={false} value={selectedValue} />;
};

export const CalendarWithMultipleDates = () => {
    const [selectedDates, setSelectedDates] = useState([
        new Date("2021-03-01"),
        new Date("2021-03-14"),
        new Date("2021-03-20"),
    ]);
    const handleChange = (value) => {
        setSelectedDates([...selectedDates, ...value]);
    };
    return <DatePicker onChange={handleChange} isDatePicker={false} value={selectedDates} />;
};

export const Datepicker = () => {
    const [selectedValue, setSelectedValue] = useState();
    const handleChange = (value) => {
        setSelectedValue(value);
        console.log(selectedValue);
    };
    return (
        <DatePicker
            isDatePicker={true}
            placeholder="Select Date"
            format="dd MMM, yyyy"
            value={selectedValue}
            onChange={(v) => handleChange(v)}
        />
    );
};

export const MultiDatePicker = () => {
    const [selectedDates, setSelectedDates] = useState();
    const handleChange = (value) => {
        setSelectedDates([...value]);
        console.log(selectedDates);
    };
    return (
        <DatePicker
            isDatePicker={true}
            isMultiple={true}
            placeholder="Select Date"
            format="dd MMM, yyyy"
            value={selectedDates}
            onChange={(v) => handleChange(v)}
        />
    );
};

export const RangePicker = () => {
    const [range, setRange] = useState({ from: null, to: null });
    const today = new Date();
    const handleChange = (value, key) => {
        let currentRange = { ...range };
        currentRange[key] = value;
        setRange(currentRange);
    };
    return (
        <Fragment>
            <DatePicker
                isDatePicker={true}
                placeholder="From"
                value={range.from}
                minDate={today}
                format="MM-dd-yyyy"
                maxDate={range.to}
                onChange={(v) => handleChange(v, "from")}
                name="from"
            />{" "}
            untill{" "}
            <DatePicker
                isDatePicker={true}
                placeholder="To"
                value={range.to}
                minDate={range.from ? range.from : today}
                format="MM-dd-yyyy"
                onChange={(v) => handleChange(v, "to")}
                name="to"
            />
        </Fragment>
    );
};
