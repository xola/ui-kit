import PropTypes from "prop-types";
import React, { useState } from "react";
import dayjs from "dayjs";
import { ChevronDownIcon } from "../../icons";
import { MonthGrid } from "./MonthGrid";

export const MonthSelector = ({ date, locale, onChange, currentMonth }) => {
    const [isSelectingMonth, setIsSelectingMonth] = useState(false);
    const [year, setYear] = useState(new Date(currentMonth).getFullYear());

    const handleMonthSelect = (newDate) => {
        onChange(newDate);
        setIsSelectingMonth(false);
    };

    const handleYearChange = (offset) => {
        setYear(year + offset);
    };

    const handleClear = () => {
        setIsSelectingMonth(false);
    };

    const handleToday = () => {
        onChange(new Date());
        setIsSelectingMonth(false);
    };

    return (
        <span className="DayPicker-Caption items-center">
            <span className="inline-block">
                {isSelectingMonth ? (
                    <span className="absolute top-0 z-10 rounded-lg  border border-gray bg-white p-3 shadow-md">
                        <MonthGrid
                            year={year}
                            value={date}
                            locale={locale}
                            handleYearChange={handleYearChange}
                            handleClear={handleClear}
                            handleToday={handleToday}
                            onChange={(date) => handleMonthSelect(date)}
                        />
                    </span>
                ) : (
                    <div
                        className="mt-1 flex cursor-pointer items-center justify-between font-bold"
                        onClick={() => setIsSelectingMonth(true)}
                    >
                        <span className="pr-1 text-lg">{dayjs(date).locale(locale).format("MMMM YYYY")}</span>
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
