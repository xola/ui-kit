import dayjs from "dayjs";
import React, { useRef } from "react";
import { Select } from "../Forms/Select";

const today = dayjs();

const getDiffInMonths = (to: Date, from: Date) => {
    return 12 * (to.getFullYear() - from.getFullYear()) + (to.getMonth() - from.getMonth());
};

export interface MonthYearSelectorProps {
    date: Date;
    currentMonth: Date;
    locale?: string;
    onChange: (newDate: Date) => void;
}

export const MonthYearSelector = ({ date, currentMonth, locale, onChange }: MonthYearSelectorProps) => {
    const monthRef = useRef<HTMLInputElement>(null);
    const yearRef = useRef<HTMLInputElement>(null);

    const months = [...Array.from({ length: 12 }).keys()].map((m) =>
        today
            .locale(locale ?? "en")
            .month(m)
            .format("MMM"),
    );
    // 2012 as baseline + 5 years in future
    const years = [...Array.from({ length: today.year() - 2012 + 5 + 1 }).keys()].map((y) =>
        today
            .locale(locale ?? "en")
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

    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const monthValue = Number(event.target.value);
        const yearValue = yearRef.current ? Number(yearRef.current.value) : date.getFullYear();
        onChange(new Date(yearValue, monthValue - selectorIndex));
    };

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const yearValue = Number(event.target.value);
        onChange(new Date(yearValue, currentMonth.getMonth()));
    };

    return (
        <form className="DayPicker-Caption space-x-2">
            <span className="inline-block">
                <Select
                    ref={monthRef}
                    name="month"
                    value={date.getMonth()}
                    className="month-selector"
                    onChange={handleMonthChange}
                >
                    {months.map((month, index) => (
                        <option key={month} value={index}>
                            {month}
                        </option>
                    ))}
                </Select>
            </span>

            <span className="inline-block">
                <Select
                    ref={yearRef}
                    name="year"
                    value={date.getFullYear()}
                    className="year-selector"
                    onChange={handleYearChange}
                >
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
