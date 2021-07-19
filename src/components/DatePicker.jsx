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

const expectedFormat = "ddd, MMM DD, YYYY";
const today = dayjs();

export const DatePickerInput = ({
    inputComponent = InputComponent,
    selectedDay = new Date(),
    shouldShowOverlay = false,
    datePickerProps = { todayButton: "Today" },
}) => {
    const [date, setDate] = useState(selectedDay);

    const handleDayChange = (day, options) => {
        console.assert(!options.disabled, "Date is disabled");
        console.log("DatePickerInput Day is " + formatDate(date, expectedFormat));
        setDate(day);
    };

    const formatSelectedDate = (date) => formatDate(date, expectedFormat);

    datePickerProps.selectedDays = [date];

    return (
        <DayPickerInput
            component={inputComponent}
            placeholder={dayjs().format(expectedFormat)}
            showOverlay={shouldShowOverlay}
            formatDate={formatSelectedDate}
            dayPickerProps={datePickerProps}
            onDayChange={handleDayChange}
        />
    );
};

const InputComponent = forwardRef((props, _reference) => {
    return <Input readOnly size="small" className="cursor-pointer" {...props} />;
});

DatePickerInput.propTypes = {
    inputComponent: PropTypes.element,
    selectedDay: PropTypes.oneOfType([Date]),
    shouldShowOverlay: PropTypes.bool,
    datePickerProps: PropTypes.object,
};

export const DatePicker = ({
    selectedDate,
    startDate = new Date(),
    handleDayClick,
    handleMonthChange,
    disabledDays = [],
    shouldShowYearPicker = false,
    customContent = {},
    modifiers = {},
    ...rest
}) => {
    const [date, setDate] = useState(selectedDate ?? startDate);
    const [start, setStart] = useState(startDate ?? selectedDate);

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
        setStart(month);
        if (handleMonthChange) {
            handleMonthChange.call(this, month);
        } else {
            console.warn("`handleMonthChange` callback undefined. Please use it listening to month changes");
            console.log("Selected month", formatDate(month, "YYYY-MM"));
        }
    };

    let captionElement;
    if (shouldShowYearPicker) {
        captionElement = ({ date }) => {
            return <MonthYearSelector date={date} onChange={handleMonthChangeWrapper} />;
        };

        captionElement.propTypes = { date: PropTypes.objectOf(Date).isRequired };
    }

    let renderDay;
    if (Object.keys(customContent).length > 0) {
        renderDay = (day) => RenderCustomContent(date, day, customContent);
    }

    return (
        <div className="date-picker">
            <DayPicker
                modifiers={modifiers}
                selectedDays={[date]} // Xola date picker doesn't support selecting multiple days yet
                month={start}
                disabledDays={disabledDays}
                todayButton="Today"
                captionElement={captionElement}
                renderDay={renderDay}
                onDayClick={handleDayClickWrapper}
                {...rest}
            />
        </div>
    );
};

DatePicker.propTypes = {
    selectedDay: PropTypes.objectOf(Date),
    startDate: PropTypes.objectOf(Date),
    disabledDays: PropTypes.array,
    modifiers: PropTypes.object,
    shouldShowYearPicker: PropTypes.bool,
    customContent: PropTypes.array,
};

const RenderCustomContent = (currentDate, day, content) => {
    const date = day.getDate();
    const value = content[date] ?? "N/A";
    const isSameDay = dayjs(currentDate).isSame(day, "day");

    return (
        <div className="w-10 h-10">
            <div className={clsx(isSameDay ? "text-white" : "text-black")}>{date}</div>
            <span className={clsx("text-sm", isSameDay ? "text-white" : "text-gray-dark")}>{value}</span>
        </div>
    );
};

RenderCustomContent.propTypes = {
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
