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

    return (
        <span className="DayPicker-Caption">
            <span className="inline-block">
                <Popover visible={isVisible} distance={5} skidding={60} placement="bottom" onClickOutside={handleClear}>
                    <div
                        className="mt-2 cursor-pointer items-center justify-between font-bold"
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
