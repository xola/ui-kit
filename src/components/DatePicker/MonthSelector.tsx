import dayjs from "dayjs";
import React, { useState } from "react";
import { ChevronDownIcon } from "../../icons";
import { Popover } from "../Popover/Popover";
import { MonthGrid } from "./MonthGrid";

export interface MonthSelectorProps {
    date: Date;
    currentMonth: Date;
    locale?: string;
    onChange: (newDate: Date) => void;
}

export const MonthSelector = ({ date, currentMonth, locale, onChange }: MonthSelectorProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [year, setYear] = useState(new Date(currentMonth).getFullYear());

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const handleMonthSelect = (newDate: Date) => {
        onChange(newDate);
        setIsVisible(false);
    };

    const handleYearChange = (offset: number) => {
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
                        className="mt-2 min-w-40 cursor-pointer items-center justify-between text-left font-bold"
                        onClick={toggleVisibility}
                    >
                        <span className="pr-1 text-lg">
                            {dayjs(date)
                                .locale(locale ?? "en")
                                .format("MMMM YYYY")}
                        </span>
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
