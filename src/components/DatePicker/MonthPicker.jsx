import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Button } from "../Buttons/Button";
import { MonthGrid } from "./MonthGrid";

export const MonthPicker = ({ value, onChange, locale, className }) => {
    const [year, setYear] = useState(new Date(value).getFullYear());

    const handleYearChange = (offset) => {
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
        <div className={clsx("ui-month-picker   max-w-xs rounded-lg bg-white", className)}>
            <MonthGrid
                year={year}
                value={value}
                handleYearChange={handleYearChange}
                locale={locale}
                onChange={onChange}
            />

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

MonthPicker.propTypes = {
    value: PropTypes.objectOf(Date),
    onChange: PropTypes.func,
    className: PropTypes.string,
    locale: PropTypes.string,
};
