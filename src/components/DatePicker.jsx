import clsx from "clsx";
import dayjs from "dayjs";
import React, { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import DayPicker from "react-day-picker";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import "./DatePicker.css";
import { formatDate } from "../helpers/date";
import { Input } from "./Forms/Input";

const today = dayjs();

export const DatePickerInput = ({
    inputComponent = InputComponent,
    selectedDate = new Date(),
    dateFormat = "ddd, MMM DD, YYYY",
    shouldShowOverlay = false,
    datePickerProps = { todayButton: "Today" },
    handleDayChange,
}) => {
    const [date, setDate] = useState(selectedDate);

    if (!handleDayChange) {
        // TODO: Cleanup handling
        handleDayChange = (day, options) => {
            console.assert(!options.disabled, "Date is disabled");
            console.log("DatePickerInput Day is " + formatDate(date, dateFormat));
            setDate(day);
        };
    }

    const formatSelectedDate = (date) => formatDate(date, dateFormat);

    datePickerProps.selectedDays = [date];
    datePickerProps.onTodayButtonClick = (today) => {
        console.log("DatePickerInput onTodayButtonClick", formatDate(today));
        setDate(today);
    };

    return (
        <DayPickerInput
            component={inputComponent}
            placeholder={dayjs().format(dateFormat)}
            showOverlay={shouldShowOverlay}
            formatDate={formatSelectedDate}
            dayPickerProps={datePickerProps} // TODO: overlayComponent
            onDayChange={handleDayChange}
        />
    );
};

const InputComponent = forwardRef((props, _reference) => {
    return <Input readOnly size="small" className="cursor-pointer" {...props} />;
});

DatePickerInput.propTypes = {
    inputComponent: PropTypes.element,
    selectedDate: PropTypes.oneOfType([Date]),
    dateFormat: PropTypes.string,
    shouldShowOverlay: PropTypes.bool,
    datePickerProps: PropTypes.object,
    handleDayChange: PropTypes.func,
};

export const DatePicker = ({
    selectedDate,
    startMonth = new Date(),
    disabledDays = [],
    shouldShowYearPicker = false,
    customContent = [],
    modifiers = {},
    handleDayClick,
    handleMonthChange,
    handleTodayButtonClick,
    ...rest
}) => {
    const [date, setDate] = useState(selectedDate);
    const [initialMonth, setInitialMonth] = useState(startMonth ?? selectedDate);

    let captionElement;
    if (shouldShowYearPicker) {
        captionElement = ({ date }) => {
            return <MonthYearSelector date={date} onChange={handleMonthChangeWrapper} />;
        };

        captionElement.propTypes = { date: PropTypes.objectOf(Date).isRequired };
    }

    let renderDay;
    if (customContent && customContent.length > 0) {
        renderDay = (day) => renderCustomContent({ date, day, customContent });
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
        setDate(day);
        handleDayClick.call(this, day, options);
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
            setDate(today);
        };
    }

    const selectedDays = selectedDate ?? date;

    return (
        <div className="date-picker">
            <DayPicker
                modifiers={modifiers}
                selectedDays={[selectedDays]} // Xola date picker doesn't support selecting multiple dates
                month={initialMonth}
                disabledDays={disabledDays}
                todayButton="Today"
                captionElement={captionElement}
                renderDay={renderDay}
                onDayClick={handleDayClickWrapper}
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
    shouldShowYearPicker: PropTypes.bool,
    customContent: PropTypes.array,
    handleDayClick: PropTypes.func,
    handleMonthChange: PropTypes.func,
    handleTodayButtonClick: PropTypes.func,
};

const renderCustomContent = ({ currentDate, day, customContent }) => {
    const date = day.getDate();
    const value = customContent[date] ?? "N/A";
    const isSameDay = dayjs(currentDate).isSame(day, "day");

    return (
        <div className="w-10 h-10">
            <div className={clsx(isSameDay ? "text-white" : "text-black")}>{date}</div>
            <span className={clsx("text-sm", isSameDay ? "text-white" : "text-gray-dark")}>{value}</span>
        </div>
    );
};

renderCustomContent.propTypes = {
    currentDate: PropTypes.objectOf(Date).isRequired,
    day: PropTypes.objectOf(Date).isRequired,
    content: PropTypes.object.isRequired,
};

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
