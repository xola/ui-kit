import clsx from "clsx";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { useState } from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import { formatDate } from "../../helpers/date";
import { ChevronLeftIcon } from "../../icons/ChevronLeftIcon";
import { ChevronRightIcon } from "../../icons/ChevronRightIcon";
import "./DatePicker.css";

const today = dayjs();

/**
 * Figma Design link: https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%F0%9F%9B%A0-Xola-DS-Desktop-Master-%F0%9F%9B%A0?node-id=2689%3A101580
 */
export const DatePicker = ({
    selectedDate,
    startMonth = new Date(),
    disabledDays = [],
    shouldShowYearPicker = false,
    customContent = [],
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

    let captionElement;
    if (shouldShowYearPicker) {
        captionElement = ({ date }) => {
            return <MonthYearSelector date={date} onChange={handleMonthChangeWrapper} />;
        };

        captionElement.propTypes = { date: PropTypes.objectOf(Date).isRequired };
    }

    let renderDay;
    const hasCustomContent = customContent && customContent.length > 0;
    if (hasCustomContent) {
        renderDay = (day) => renderCustomContent({ selectedDate: date.from, day, customContent });
    } else {
        renderDay = (day) => dayStylingWrapper({ selectedDate: date.from, day });
    }

    if (!handleDayClick) {
        // Default wrapper so that we can show the date, and a warning for user to handle this
        handleDayClick = (day, options = {}) => {
            console.warn("`handleDayClick` callback undefined. Please use it listening to date changes");
            console.log("Selected date", formatDate(day, "YYYY-MM-DD"), options);
        };
    }

    // A wrapper for the callback so we can use local state and invoke the call back
    const handleDayClickWrapper = (day, options) => {
        let newValue = { from: day }; // This single date mode, but we still need to check if this is a range picker
        if (hasRange && date.from) {
            // Check if the user selected an end date or starting date
            newValue = date.from > day ? { from: day, to: date.from } : { from: date.from, to: day };
        }

        setDate(newValue);

        const callbackValue = newValue.from && newValue.to ? newValue : newValue.from;
        handleDayClick.call(this, callbackValue, options);
    };

    const handleMonthChangeWrapper = (month) => {
        setInitialMonth(month);
        if (handleMonthChange) {
            handleMonthChange.call(this, month);
        } else {
            console.warn("`handleMonthChange` callback undefined. Please use it listening to month changes");
            console.log("Selected month", formatDate(month, "YYYY-MM"));
        }
    };

    if (!handleTodayButtonClick) {
        handleTodayButtonClick = (today) => {
            console.log("DatePicker today", formatDate(today));
            handleDayClickWrapper(today);
        };
    }

    let selectedDays = [date && date.from ? date.from : selectedDate];
    const rangesSet = date.from && date.to;
    if (rangesSet) {
        selectedDays = [date.from, { from: date.from, to: date.to }];
        modifiers = { start: date.from, end: date.to };
    }

    console.log("Selected days", selectedDays);
    return (
        <div
            className={clsx(
                "date-picker",
                rangesSet ? "Selectable" : "",
                hasCustomContent ? "has-custom-content" : null,
            )}
        >
            <DayPicker
                showOutsideDays
                modifiers={modifiers}
                selectedDays={selectedDays}
                month={initialMonth}
                numberOfMonths={range}
                disabledDays={disabledDays}
                todayButton="Today"
                captionElement={captionElement}
                renderDay={renderDay}
                navbarElement={navbarElement}
                onDayClick={handleDayClickWrapper}
                onMonthChange={handleMonthChangeWrapper}
                onTodayButtonClick={handleTodayButtonClick}
                {...rest}
            />
        </div>
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

/**
 * Render the custom left & right arrows to change the current month
 */
export const navbarElement = ({ onPreviousClick, onNextClick, className, showNextButton, showPreviousButton }) => {
    return (
        <div className={clsx("absolute z-50 top-1.5 right-1", className)}>
            <ChevronButton
                chevron={<ChevronLeftIcon />}
                shouldShowIcon={showPreviousButton}
                onClick={onPreviousClick}
            />
            <ChevronButton chevron={<ChevronRightIcon />} shouldShowIcon={showNextButton} onClick={onNextClick} />
        </div>
    );
};

const ChevronButton = ({ chevron, shouldShowIcon = true, onClick }) => {
    return (
        <button
            type="button"
            className={clsx(
                shouldShowIcon ? "inline-block" : "invisible",
                "rounded-full border border-transparent text-black hover:border-black p-1.5",
            )}
            onClick={() => onClick()}
        >
            {chevron}
        </button>
    );
};

ChevronButton.propTypes = {
    chevron: PropTypes.element.isRequired,
    shouldShowIcon: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
};

const dayStylingWrapper = ({ selectedDate, day }) => {
    const date = day.getDate();
    const isSameDay = selectedDate && dayjs(selectedDate).isSame(day, "day");

    return (
        <div
            className={clsx(
                "date flex items-center w-full h-full justify-center",
                isSameDay ? "text-white selected" : null,
            )}
        >
            {date}
        </div>
    );
};

/**
 * Render custom content in the cell and mark the active day
 */
const renderCustomContent = ({ selectedDate, day, customContent }) => {
    const date = day.getDate();
    const value = customContent[date] ?? "N/A";
    const isSameDay = selectedDate && dayjs(selectedDate).isSame(day, "day");
    const isSameMonth = dayjs().isSame(day, "month");

    return (
        <>
            {/* The date itself */}
            <div className={clsx("date-value mb-1 leading-p1", isSameDay ? "text-white selected" : null)}>{date}</div>
            {/* The custom content below it */}
            <div
                className={clsx(
                    "custom-content text-xs leading-p3",
                    isSameDay ? "text-white" : isSameMonth ? "text-gray-dark" : "text-gray-light",
                )}
            >
                {value}
            </div>
        </>
    );
};

renderCustomContent.propTypes = {
    currentDate: PropTypes.objectOf(Date).isRequired,
    day: PropTypes.objectOf(Date).isRequired,
    content: PropTypes.object.isRequired,
};

/**
 * Show year and month as dropdowns to change the currently selected date
 */
const MonthYearSelector = ({ date, onChange }) => {
    const months = [...Array.from({ length: 12 }).keys()].map((m) => today.month(m).format("MMM"));
    const years = [...Array.from({ length: 12 }).keys()].map((y) => today.year(2021 + y).format("YYYY"));

    const handleChange = (event_) => {
        const { year, month } = event_.target.form;
        onChange(new Date(year.value, month.value));
    };

    return (
        <form className="DayPicker-Caption">
            <select name="month" value={date.getMonth()} className="month-selector" onChange={handleChange}>
                {months.map((month, index) => (
                    <option key={month} value={index}>
                        {month}
                    </option>
                ))}
            </select>
            <select name="year" value={date.getFullYear()} className="year-selector" onChange={handleChange}>
                {years.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
        </form>
    );
};

MonthYearSelector.propTypes = {
    date: PropTypes.objectOf(Date).isRequired,
    onChange: PropTypes.func.isRequired,
};
