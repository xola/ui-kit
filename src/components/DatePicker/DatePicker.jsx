import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import "./DatePicker.css";
import { Day } from "./Day";
import { MonthYearSelector } from "./MonthYearSelector";
import { NavbarElement } from "./NavbarElement";

const variants = {
    single: "single",
    range: "range",
};

/**
 * Figma Design link: https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%F0%9F%9B%A0-Xola-DS-Desktop-Master-%F0%9F%9B%A0?node-id=2689%3A101580
 */
export const DatePicker = ({
    variant = variants.single,
    value,
    onChange,
    initialMonth = new Date(),
    onMonthChange,
    onTodayButtonClick,
    disabledDays = [],
    shouldShowYearPicker = false,
    getDayContent,
    modifiers = {},
    ...rest
}) => {
    const [month, setMonth] = useState(initialMonth);
    const isRangeVariant = variant === variants.range;

    // Sync internal month state with outside.
    useEffect(() => {
        onMonthChange?.(month);
    }, [month, onMonthChange]);

    const handleDayClick = (day) => {
        if (isRangeVariant) {
            onChange(DateUtils.addDayToRange(day, value));
        } else {
            onChange(day);
        }
    };

    const handleMonthChange = (value) => {
        setMonth(value);
    };

    const captionElement = shouldShowYearPicker
        ? ({ date }) => <MonthYearSelector date={date} onChange={handleMonthChange} />
        : undefined;

    const renderDay = (day) => {
        return <Day selectedDate={value} day={day} getContent={getDayContent} />;
    };

    const rangeModifier = isRangeVariant ? { start: value.from, end: value.to } : null;

    return (
        <DayPicker
            className={clsx(
                "date-picker",
                isRangeVariant ? "date-range-picker" : null,
                getDayContent ? "has-custom-content" : null,
            )}
            showOutsideDays
            todayButton="Today"
            selectedDays={value}
            onDayClick={handleDayClick}
            initialMonth={initialMonth}
            month={month}
            onMonthChange={handleMonthChange}
            modifiers={{ ...modifiers, ...rangeModifier }}
            numberOfMonths={isRangeVariant ? 2 : 1}
            disabledDays={disabledDays}
            captionElement={captionElement}
            renderDay={renderDay}
            navbarElement={NavbarElement}
            onTodayButtonClick={onTodayButtonClick}
            {...rest}
        />
    );
};

DatePicker.propTypes = {
    variant: PropTypes.oneOf(Object.keys(variants)),
    value: PropTypes.objectOf(Date).isRequired,
    onChange: PropTypes.func.isRequired,
    initialMonth: PropTypes.objectOf(Date),
    onMonthChange: PropTypes.func,
    onTodayButtonClick: PropTypes.func,
    disabledDays: PropTypes.array,
    shouldShowYearPicker: PropTypes.bool,
    getDayContent: PropTypes.func,
    modifiers: PropTypes.object,
};
