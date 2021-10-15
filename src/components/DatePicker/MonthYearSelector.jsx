import dayjs from "dayjs";
import PropTypes from "prop-types";
import React from "react";
import { Select } from "../Forms/Select";

const today = dayjs();

export const MonthYearSelector = ({ date, onChange }) => {
    const months = [...Array.from({ length: 12 }).keys()].map((m) => today.month(m).format("MMM"));
    const years = [...Array.from({ length: 12 }).keys()].map((y) => today.year(2021 + y).format("YYYY"));

    const handleChange = (event) => {
        const { year, month } = event.target.form;
        onChange(new Date(year.value, month.value));
    };

    return (
        <form className="space-x-2 DayPicker-Caption">
            <span className="inline-block">
                <Select name="month" value={date.getMonth()} className="month-selector" onChange={handleChange}>
                    {months.map((month, index) => (
                        <option key={month} value={index}>
                            {month}
                        </option>
                    ))}
                </Select>
            </span>

            <span className="inline-block">
                <Select name="year" value={date.getFullYear()} className="year-selector" onChange={handleChange}>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </Select>
            </span>
        </form>
    );
};

MonthYearSelector.propTypes = {
    date: PropTypes.objectOf(Date).isRequired,
    onChange: PropTypes.func.isRequired,
};
