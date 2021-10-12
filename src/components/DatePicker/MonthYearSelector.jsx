import dayjs from "dayjs";
import PropTypes from "prop-types";
import React from "react";
import { Select } from "../Forms/Select";

const today = dayjs();

export const MonthYearSelector = ({ date, onChange }) => {
    const months = [...Array.from({ length: 12 }).keys()].map((m) => today.month(m).format("MMM"));
    const years = [...Array.from({ length: 12 }).keys()].map((y) => today.year(2021 + y).format("YYYY"));

    const handleMonthChange = (data) => {
        // console.log("handle month", data.label, data.value);
        date.setMonth(data.value);
        onChange(date);
    };

    const handleYearChange = (data) => {
        // console.log("handle year", data.label, data.value);
        date.setYear(data.value);
        onChange(date);
    };

    const monthOptions = months.map((month, index) => {
        return { label: month, value: index, isOptionSelected: true };
    });
    const yearOptions = years.map((year) => {
        return { label: year, value: Number(year) };
    });

    return (
        <form className="space-x-2 DayPicker-Caption">
            <Select
                name="month"
                value={monthOptions[date.getMonth()]}
                options={monthOptions}
                className="inline-block w-20 month-selector"
                onChange={handleMonthChange}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 30 }) }}
                menuPortalTarget={document.body}
            />

            <Select
                name="year"
                options={yearOptions}
                value={yearOptions.find((y) => y.value === date.getFullYear())}
                className="inline-block w-22 year-selector"
                onChange={handleYearChange}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 30 }) }}
                menuPortalTarget={document.body}
            />
        </form>
    );
};

MonthYearSelector.propTypes = {
    date: PropTypes.objectOf(Date).isRequired,
    onChange: PropTypes.func.isRequired,
};
