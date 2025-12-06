import clsx from "clsx";
import dayjs from "dayjs";
import React, { useContext } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "../../icons";
import { Context } from "../Provider";
import { Button } from "../Buttons/Button";
import { ChevronButton } from "./NavbarElement";

const today = dayjs();

export interface MonthGridProps {
    year: number;
    readonly value?: Date;
    readonly locale?: string;
    onChange: (newDate: Date) => void;
    handleYearChange: (offset: number) => void;
    handleClear: () => void;
    handleToday: () => void;
}

export const MonthGrid = ({
    year,
    value,
    locale,
    onChange,
    handleYearChange,
    handleClear,
    handleToday,
}: MonthGridProps) => {
    const { locale: contextLocale } = useContext(Context);
    const months = [...Array.from({ length: 12 }).keys()].map((m) =>
        today
            .locale(locale ?? contextLocale)
            .month(m)
            .format("MMM"),
    );

    const handleMonthSelect = (monthIndex: number) => {
        const newDate = new Date(year, monthIndex);
        onChange(newDate);
    };

    return (
        <span className="min-w-72">
            <div className="mb-4 flex items-center justify-between">
                <ChevronButton onClick={() => handleYearChange(-1)}>
                    <ChevronLeftIcon />
                </ChevronButton>
                <span className="text-lg font-bold">{year}</span>
                <ChevronButton onClick={() => handleYearChange(1)}>
                    <ChevronRightIcon />
                </ChevronButton>
            </div>

            <div className="grid grid-cols-4 gap-2">
                {months.map((month, index) => (
                    <button
                        key={month}
                        type="button"
                        className={clsx(
                            value && value.getMonth() === index && value.getFullYear() === year
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

            <div className="mt-2 flex justify-between border-t border-gray-lighter pt-2">
                <Button size="small" color="secondary" variant="outline" onClick={handleClear}>
                    Clear
                </Button>
                <Button size="small" color="secondary" variant="outline" onClick={handleToday}>
                    Today
                </Button>
            </div>
        </span>
    );
};
