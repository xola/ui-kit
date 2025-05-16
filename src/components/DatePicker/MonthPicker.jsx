import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import dayjs from "dayjs";
import { Button } from "../Buttons/Button";
import { ChevronLeftIcon, ChevronRightIcon } from "../../icons";
import { Context } from "../Provider";

const today = dayjs();

export const MonthPicker = ({ value, onChange, locale, className }) => {
    const { locale: contextLocale } = useContext(Context);
    const [year, setYear] = useState(new Date(value).getFullYear());

    const months = [...Array.from({ length: 12 }).keys()].map((m) =>
        today
            .locale(locale ?? contextLocale)
            .month(m)
            .format("MMM"),
    );

    const handleMonthSelect = (monthIndex) => {
        const newDate = new Date(year, monthIndex);
        console.log("handleMonthSelect", newDate);
        onChange(newDate);
    };

    const handlePreviousYear = () => {
        setYear(year - 1);
    };

    const handleNextYear = () => {
        setYear(year + 1);
    };

    const handleToday = () => {
        const today = new Date();
        setYear(today.getFullYear());
        onChange(today);
    };

    const handleClear = () => {
        onChange(value);
    };

    const isCurrentYear = value.getFullYear() === year;

    return (
        <div className={clsx("ui-month-picker   max-w-xs rounded-lg bg-white", className)}>
            <div className="mb-4 flex items-center justify-between">
                <ChevronButton isVisible onClick={handlePreviousYear}>
                    <ChevronLeftIcon />
                </ChevronButton>
                <span className="text-lg font-bold">{year}</span>
                <ChevronButton isVisible onClick={handleNextYear}>
                    <ChevronRightIcon />
                </ChevronButton>
            </div>

            <div className="grid grid-cols-4 gap-2">
                {months.map((month, index) => (
                    <button
                        key={month}
                        type="button"
                        className={clsx(
                            value.getMonth() === index && isCurrentYear ? "bg-blue-dark text-white" : "text-black",
                            "rounded-md p-4 text-center hover:bg-blue-dark hover:text-white",
                        )}
                        onClick={() => handleMonthSelect(index)}
                    >
                        {month}
                    </button>
                ))}
            </div>
            <div className="mt-2 flex justify-between border-t border-gray-lighter pt-2">
                <Button size="small" color="secondary" variant="outline" onClick={handleClear}>
                    Clear
                </Button>
                <Button size="small" color="secondary" variant="outline" onClick={handleToday}>
                    Today
                </Button>
            </div>
        </div>
    );
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

MonthPicker.propTypes = {
    value: PropTypes.objectOf(Date),
    onChange: PropTypes.func,
    className: PropTypes.string,
    locale: PropTypes.string,
};
