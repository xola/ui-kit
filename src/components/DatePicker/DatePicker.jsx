import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useState } from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import "./DatePicker.css";
import { Day } from "./Day";
import { MonthYearSelector } from "./MonthYearSelector";
import { NavbarElement } from "./NavbarElement";

/**
 * Figma Design link: https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%F0%9F%9B%A0-Xola-DS-Desktop-Master-%F0%9F%9B%A0?node-id=2689%3A101580
 */
export const DatePicker = ({
    selectedDate,
    startMonth = new Date(),
    disabledDays = [],
    shouldShowYearPicker = false,
    customContent = [],
    getDayContent,
    modifiers = {},
    range,
    handleDayClick,
    handleMonthChange,
    handleTodayButtonClick,
    ...rest
}) => {
    const [date, setDate] = useState({ from: selectedDate, to: null });
    const [initialMonth, setInitialMonth] = useState(startMonth ?? selectedDate);
    const hasRange = range && range > 1;

    // A wrapper for the callback so we can use local state and invoke the call back
    const handleDayClickWrapper = (day, options) => {
        let newValue = { from: day }; // This single date mode, but we still need to check if this is a range picker
        if (hasRange && date.from) {
            // Check if the user selected an end date or starting date
            newValue = date.from > day ? { from: day, to: date.from } : { from: date.from, to: day };
        }

        setDate(newValue);

        const callbackValue = newValue.from && newValue.to ? newValue : newValue.from;
        handleDayClick?.(callbackValue, options);
    };

    const handleMonthChangeWrapper = (month) => {
        setInitialMonth(month);
        if (handleMonthChange) {
            handleMonthChange?.(month);
        }
    };

    let selectedDays = [date && date.from ? date.from : selectedDate];
    const rangesSet = date.from && date.to;
    if (rangesSet) {
        selectedDays = [date.from, { from: date.from, to: date.to }];
        modifiers = { start: date.from, end: date.to };
    }

    const captionElement = shouldShowYearPicker
        ? ({ date }) => <MonthYearSelector date={date} onChange={handleMonthChangeWrapper} />
        : undefined;

    const renderDay = (day) => {
        return <Day selectedDate={date.from} day={day} getContent={getDayContent} />;
    };

    return (
        <DayPicker
            className={clsx(
                "date-picker",
                rangesSet ? "date-range-picker" : null,
                getDayContent ? "has-custom-content" : null,
            )}
            showOutsideDays
            modifiers={modifiers}
            selectedDays={selectedDays}
            month={initialMonth}
            numberOfMonths={range}
            disabledDays={disabledDays}
            todayButton="Today"
            captionElement={captionElement}
            renderDay={renderDay}
            navbarElement={NavbarElement}
            onDayClick={handleDayClickWrapper}
            onMonthChange={handleMonthChangeWrapper}
            onTodayButtonClick={handleTodayButtonClick}
            {...rest}
        />
    );
};

DatePicker.propTypes = {
    selectedDate: PropTypes.objectOf(Date),
    startMonth: PropTypes.objectOf(Date),
    disabledDays: PropTypes.array,
    modifiers: PropTypes.object,
    range: PropTypes.number,
    shouldShowYearPicker: PropTypes.bool,
    customContent: PropTypes.array,
    handleDayClick: PropTypes.func,
    handleMonthChange: PropTypes.func,
    handleTodayButtonClick: PropTypes.func,
};
