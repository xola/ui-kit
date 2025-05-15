import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { useState } from "react";
import clsx from "clsx";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "../../icons";

const today = dayjs();

export const MonthSelector = ({ date, locale, onChange, currentMonth }) => {
    const months = [...Array.from({ length: 12 }).keys()].map((m) => today.locale(locale).month(m).format("MMM"));

    const handleMonthSelect = (monthIndex) => {
        const newDate = new Date(currentMonth.getFullYear(), monthIndex);
        console.log("handleMonthSelect", newDate);
        onChange(newDate);
        setIsSelectingMonth(false);
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
                            <ChevronButton isVisible onClick={() => handleYearChange(-1)}>
                                <ChevronLeftIcon />
                            </ChevronButton>

                            <span className="text-lg font-medium">{date.getFullYear()}</span>
                            <ChevronButton isVisible onClick={() => handleYearChange(1)}>
                                <ChevronRightIcon />
                            </ChevronButton>
                        </div>

                        <div className="grid grid-cols-4 gap-2">
                            {months.map((month, index) => (
                                <button
                                    key={month}
                                    type="button"
                                    className={clsx(
                                        date.getMonth() === index ? "bg-blue-dark text-white" : "text-black",
                                        "rounded-md p-4 text-center hover:bg-blue-dark hover:text-white",
                                    )}
                                    onClick={() => handleMonthSelect(index)}
                                >
                                    {month}
                                </button>
                            ))}
                        </div>

                        <div className="border-gray-200 flex justify-between border-t p-4">
                            <button
                                type="button"
                                className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded border bg-white px-4 py-2 transition-colors"
                                onClick={handleClear}
                            >
                                Clear
                            </button>
                            <button
                                type="button"
                                className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded border bg-white px-4 py-2 transition-colors"
                                onClick={handleToday}
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

ChevronButton.propTypes = {
    isVisible: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
};
