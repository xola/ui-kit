import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Select } from "../Forms/Select";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "../../icons";
import clsx from "clsx";

const today = dayjs();

const getDiffInMonths = (to, from) => {
    return 12 * (to.getFullYear() - from.getFullYear()) + (to.getMonth() - from.getMonth());
};

export const MonthSelector = ({ date, locale, onChange, currentMonth }) => {
    const months = [...Array.from({ length: 12 }).keys()].map((m) => today.locale(locale).month(m).format("MMM"));
    // 2012 as baseline + 5 years in future
    const years = [...Array.from({ length: today.year() - 2012 + 5 + 1 }).keys()].map((y) =>
        today
            .locale(locale)
            .year(2012 + y)
            .format("YYYY"),
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
        console.log("month", month.value);
        onChange(new Date(year.value, Number(month.value) - selectorIndex));
    };

    const handleMonthSelect = (monthIndex) => {
        const newDate = new Date(currentMonth.getFullYear(), monthIndex);
        console.log("handleMonthSelect", newDate);
        onChange(newDate);
        setIsSelectingMonth(false);
    };

    const handleYearChangeOld = (event) => {
        const { year } = event.target.form;
        onChange(new Date(year.value, currentMonth.getMonth()));
    };

    const handleYearChange = (offset) => {
        const newDate = new Date(currentMonth);
        newDate.setFullYear(newDate.getFullYear() + offset);
        console.log("handleYearChange", newDate);
        onChange(newDate);
    };

    const [isSelectingMonth, setIsSelectingMonth] = useState(false);

    const handleClear = () => {
        // setSelectedDate(undefined);
        // onChange(undefined);
        onChange(new Date());
        setIsSelectingMonth(false);
    };

    const handleToday = () => {
        const today = new Date();
        onChange(today);
        setIsSelectingMonth(false);
    };

    return (
        <span className="DayPicker-Caption space-x-2">
            <span className="inline-block">
                {isSelectingMonth ? (
                    <span className="  absolute  z-10 rounded-lg border border-gray  bg-white p-2 shadow-md">
                        <div className="mb-4 flex items-center justify-between">
                            <ChevronButton isVisible={true} onClick={() => handleYearChange(-1)}>
                                <ChevronLeftIcon />
                            </ChevronButton>

                            <span className="text-lg font-medium">{date.getFullYear()}</span>
                            <ChevronButton isVisible={true} onClick={() => handleYearChange(1)}>
                                <ChevronRightIcon />
                            </ChevronButton>
                        </div>

                        <div className="grid grid-cols-4 gap-2">
                            {months.map((month, index) => (
                                <button
                                    key={month}
                                    type="button"
                                    onClick={() => handleMonthSelect(index)}
                                    className={clsx(
                                        date.getMonth() === index ? "bg-blue-dark text-white" : "text-black",
                                        "rounded-md p-4 text-center hover:bg-blue-dark hover:text-white",
                                    )}
                                >
                                    {month}
                                </button>
                            ))}
                        </div>

                        <div className="border-gray-200 flex justify-between border-t p-4">
                            <button
                                onClick={handleClear}
                                className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded border bg-white px-4 py-2 transition-colors"
                            >
                                Clear
                            </button>
                            <button
                                onClick={handleToday}
                                className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded border bg-white px-4 py-2 transition-colors"
                            >
                                Today
                            </button>
                        </div>
                    </span>
                ) : (
                    <div
                        className="flex cursor-pointer items-center justify-between"
                        onClick={() => setIsSelectingMonth(true)}
                    >
                        <span className="text-lg font-medium">
                            {date.toLocaleString("default", { month: "long", year: "numeric" })}
                        </span>
                        <ChevronDownIcon />
                    </div>
                )}
            </span>
        </span>
    );
};

MonthSelector.propTypes = {
    date: PropTypes.objectOf(Date).isRequired,
    onChange: PropTypes.func.isRequired,
};

const ChevronButton = ({ isVisible = true, onClick, children }) => {
    return (
        <button
            type="button"
            className={clsx(
                isVisible ? "inline-block" : "invisible",
                "inline-flex h-7 w-7 items-center justify-center rounded-full border border-transparent leading-none text-black hover:border-black",
            )}
            onClick={() => onClick()}
        >
            {children}
        </button>
    );
};
