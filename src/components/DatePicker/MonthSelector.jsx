import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { useState } from "react";
import clsx from "clsx";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "../../icons";
import { Button } from "../Buttons/Button";

const today = dayjs();

export const MonthSelector = ({ date, locale, onChange, currentMonth }) => {
    const months = [...Array.from({ length: 12 }).keys()].map((m) => today.locale(locale).month(m).format("MMM"));
    const [isSelectingMonth, setIsSelectingMonth] = useState(false);
    const [selectedDate, setSelectedDate] = useState(date);
    console.log("date", date);
    console.log("currentMonth", currentMonth);
    console.log("selectedDate", selectedDate);

    const handleMonthSelect = (monthIndex) => {
        const newDate = new Date(selectedDate.getFullYear(), monthIndex);
        console.log("handleMonthSelect", newDate);
        onChange(newDate);
        setIsSelectingMonth(false);
    };

    const handleYearChange = (offset) => {
        const newDate = new Date(selectedDate);
        newDate.setFullYear(newDate.getFullYear() + offset);
        console.log("handleYearChange", newDate);
        setSelectedDate(newDate);
        // onChange(newDate);
    };

    const handleClear = () => {
        // setSelectedDate(undefined);
        // onChange(undefined);
        onChange(new Date());
        // setIsSelectingMonth(false);
    };

    const handleToday = () => {
        const today = new Date();
        onChange(today);
        setIsSelectingMonth(false);
    };

    const isCurrentYear = selectedDate.getFullYear() === currentMonth.getFullYear();
    console.log("selectedYear is same as currentMonth year", isCurrentYear);

    return (
        <span className="DayPicker-Caption">
            <span className="inline-block">
                {isSelectingMonth ? (
                    <span className="absolute top-0 z-10 rounded-lg border border-gray  bg-white p-3 shadow-md">
                        <div className="mb-4 flex items-center justify-between ">
                            <ChevronButton isVisible onClick={() => handleYearChange(-1)}>
                                <ChevronLeftIcon />
                            </ChevronButton>

                            <span className="text-lg font-bold">{selectedDate.getFullYear()}</span>
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
                                        date.getMonth() === index && isCurrentYear
                                            ? "bg-blue-dark text-white"
                                            : "text-black",
                                        "rounded-md p-4 text-center hover:bg-blue-dark hover:text-white",
                                    )}
                                    onClick={() => handleMonthSelect(index)}
                                >
                                    {month}
                                </button>
                            ))}
                        </div>
                        <div className="flex justify-between border-t border-gray-lighter p-2">
                            <Button size="small" color="secondary" variant="outline" onClick={handleClear}>
                                Clear
                            </Button>
                            <Button size="small" color="secondary" variant="outline" onClick={handleToday}>
                                Today
                            </Button>
                        </div>
                    </span>
                ) : (
                    <div
                        className="flex cursor-pointer items-center justify-between"
                        onClick={() => setIsSelectingMonth(true)}
                    >
                        <span className="pr-1 text-lg font-bold">
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
