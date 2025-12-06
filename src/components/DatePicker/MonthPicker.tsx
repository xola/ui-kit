import React, { useState } from "react";
import { MonthGrid } from "./MonthGrid";

export interface MonthPickerProps {
    value: Date;
    readonly locale?: string;
    onChange: (date: Date) => void;
}

export const MonthPicker = ({ value, locale, onChange }: MonthPickerProps) => {
    const [year, setYear] = useState(new Date(value).getFullYear());

    const handleYearChange = (offset: number) => {
        setYear(year + offset);
    };

    const handleToday = () => {
        const today = new Date();
        setYear(today.getFullYear());
        onChange(today);
    };

    const handleClear = () => {
        onChange(value);
    };

    return (
        <div className="ui-month-picker min-w-72 max-w-xs rounded-lg bg-white">
            <MonthGrid
                year={year}
                value={value}
                locale={locale}
                handleClear={handleClear}
                handleToday={handleToday}
                handleYearChange={handleYearChange}
                onChange={onChange}
            />
        </div>
    );
};
