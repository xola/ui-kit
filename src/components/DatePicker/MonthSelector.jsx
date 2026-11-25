import PropTypes from "prop-types";
import React, { useState } from "react";
import dayjs from "dayjs";
import { ChevronDownIcon } from "../../icons";
import { Popover } from "../Popover/Popover";
import { MonthGrid } from "./MonthGrid";

export const MonthSelector = ({ date, locale, onChange, currentMonth }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [year, setYear] = useState(new Date(currentMonth).getFullYear());

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const handleMonthSelect = (newDate) => {
        onChange(newDate);
        setIsVisible(false);
    };

    const handleYearChange = (offset) => {
        setYear(year + offset);
    };

    const handleClear = () => {
        setIsVisible(false);
    };

    const handleToday = () => {
        onChange(new Date());
        setIsVisible(false);
    };

    /** Radix asks to close on Escape and on presses outside; the caption's own click opens it. */
    const handleOpenChange = (isOpen) => {
        if (!isOpen) {
            handleClear();
        }
    };

    return (
        <span className="DayPicker-Caption">
            <span className="inline-block">
                <Popover
                    openOn="click"
                    open={isVisible}
                    distance={5}
                    placement="bottom-start"
                    onOpenChange={handleOpenChange}
                >
                    <div
                        className="mt-2 min-w-40 cursor-pointer items-center justify-between text-left font-bold"
                        onClick={toggleVisibility}
                    >
                        <span className="pr-1 text-lg">{dayjs(date).locale(locale).format("MMMM YYYY")}</span>
                        <ChevronDownIcon />
                    </div>
                    <Popover.Content className="p-2">
                        <MonthGrid
                            year={year}
                            value={date}
                            locale={locale}
                            handleClear={handleClear}
                            handleToday={handleToday}
                            handleYearChange={handleYearChange}
                            onChange={handleMonthSelect}
                        />
                    </Popover.Content>
                </Popover>
            </span>
        </span>
    );
};

MonthSelector.propTypes = {
    date: PropTypes.objectOf(Date).isRequired,
    onChange: PropTypes.func.isRequired,
};
