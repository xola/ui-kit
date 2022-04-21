import dayjs from "dayjs";
import PropTypes from "prop-types";
import React from "react";
import { Select } from "../Forms/Select";

const today = dayjs();

export const MonthYearSelector = ({ date, onChange, currentMonth }) => {
    const months = [...Array.from({ length: 12 }).keys()].map((m) => today.month(m).format("MMM"));
    const years = [...Array.from({ length: 12 }).keys()].map((y) => today.year(2021 + y).format("YYYY"));

    const handleMonthChange = (event) => {
        const { year, month } = event.target.form;
        onChange(new Date(year.value, month.value));
    };

    const handleYearChange = (event) => {
        const { year } = event.target.form;
        onChange(new Date(year.value, currentMonth.getMonth()));
    };

    return (
        <form className="DayPicker-Caption space-x-2">
            <span className="inline-block">
                <Select name="month" value={date.getMonth()} className="month-selector" onChange={handleMonthChange}>
                    {months.map((month, index) => (
                        <option key={month} value={index}>
                            {month}
                        </option>
                    ))}
                </Select>
            </span>

            <span className="inline-block">
                <Select name="year" value={date.getFullYear()} className="year-selector" onChange={handleYearChange}>
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
