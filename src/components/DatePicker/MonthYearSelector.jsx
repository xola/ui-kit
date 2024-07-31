import React from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { Select } from "../Forms/Select";

const today = dayjs();

const getDiffInMonths = (to, from) => {
    return 12 * (to.getFullYear() - from.getFullYear()) + (to.getMonth() - from.getMonth());
};

export const MonthYearSelector = ({ date, locale, onChange, currentMonth }) => {
    const months = [...Array.from({ length: 12 }).keys()].map((m) => today.locale(locale).month(m).format("MMM"));
    // 2012 as baseline + 5 years in future
    const years = [...Array.from({ length: today.year() - 2012 + 5 + 1 }).keys()].map((y) =>
        today.locale(locale).year(2012 + y).format("YYYY"),
    );

    /**
     * For range date pickers, when we show multiple months, this indicates the index for selector component with respected to the first month selected in date-range picker (i.e. month selected on left side)
     *
     * @example
     * If left side month is "August 2023", and we are showing this selector for "September 2023" (`date=2023-09-01T00:00:00Z`). The `selectorIndex` would be 1.
     **/
    const selectorIndex = getDiffInMonths(date, currentMonth);

    const handleMonthChange = (event) => {
        const { year, month } = event.target.form;
        onChange(new Date(year.value, Number(month.value) - selectorIndex));
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
