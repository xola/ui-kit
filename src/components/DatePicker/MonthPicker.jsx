import React, { useState } from "react";
import PropTypes from "prop-types";
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
        <div className="ui-month-picker max-w-xs rounded-lg bg-white">
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

MonthPicker.propTypes = {
    value: PropTypes.objectOf(Date),
    onChange: PropTypes.func,
    className: PropTypes.string,
    locale: PropTypes.string,
};
