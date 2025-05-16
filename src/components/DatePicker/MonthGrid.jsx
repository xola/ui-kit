import React, { useContext } from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Context } from "../Provider";
import { ChevronLeftIcon, ChevronRightIcon } from "../../icons";
import { ChevronButton } from "./NavbarElement";

const today = dayjs();

export const MonthGrid = ({ year, value, onChange, handleYearChange, locale }) => {
    const { locale: contextLocale } = useContext(Context);
    const months = [...Array.from({ length: 12 }).keys()].map((m) =>
        today
            .locale(locale ?? contextLocale)
            .month(m)
            .format("MMM"),
    );

    const handleMonthSelect = (monthIndex) => {
        const newDate = new Date(year, monthIndex);
        onChange(newDate);
    };

    const isCurrentYear = value && value.getFullYear() === year;

    return (
        <>
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
                            value && value.getMonth() === index && isCurrentYear
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
        </>
    );
};

MonthGrid.propTypes = {
    year: PropTypes.number.isRequired,
    value: PropTypes.objectOf(Date),
    onChange: PropTypes.func.isRequired,
    locale: PropTypes.string,
};
