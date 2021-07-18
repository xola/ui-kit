import clsx from "clsx";
import dayjs from "dayjs";
import React, { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import DayPicker from "react-day-picker";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import "./DatePicker.css";
import { Input } from "./Forms/Input";

const expectedFormat = "ddd, MMM DD, YYYY";
const today = dayjs();

const InputComponent = forwardRef((props, _reference) => {
    return <Input readOnly size="small" className="cursor-pointer" {...props} />;
});

export const DatePickerInput = ({
    inputComponent = InputComponent,
    selectedDay = new Date(),
    shouldShowOverlay = false,
    datePickerProps = { todayButton: "Today" },
}) => {
    const [date, setDate] = useState(selectedDay);

    const handleDayChange = (day, options) => {
        console.assert(!options.disabled, "Date is disabled");
        console.log("DatePickerInput Day is " + dayjs(day).format("ddd, YYYY-MM-DD"));
        setDate(day);
    };

    const formatSelectedDate = (selectedDate) => {
        // console.log("formatDate", selectedDate);
        return dayjs(selectedDate).format(expectedFormat);
    };

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

DatePickerInput.propTypes = {
    inputComponent: PropTypes.element,
    selectedDay: PropTypes.oneOfType([Date]),
    shouldShowOverlay: PropTypes.bool,
    datePickerProps: PropTypes.object,
};

export const DatePicker = ({
    selectedDay,
    month = new Date(),
    disabledDays = [],
    shouldShowYearPicker = false,
    customContent = {},
    modifiers = {},
    modifiersStyles = {}, // This can be hard-coded in the UI Kit component
    ...rest
}) => {
    const [date, setDate] = useState(selectedDay);
    if (date) {
        month = date;
    }

    const handleDayClick = (day, options = {}) => {
        console.assert(!options.disabled, "Date is disabled");
        console.log("Day is", dayjs(day).format("YYYY-MM-DD"));
        setDate(day);
    };

    let captionElement;
    if (shouldShowYearPicker) {
        captionElement = ({ date }) => {
            return <YearMonthForm date={date} onChange={handleDayClick} />;
        };

        captionElement.propTypes = {
            date: PropTypes.objectOf(Date).isRequired,
        };
    }

    let renderDay;
    if (Object.keys(customContent).length > 0) {
        renderDay = (day) => renderContent(date, day, customContent);
    }

    // onChange
    // selectsStart selectsEnd
    // minDate
    // selec

    return (
        <div className="date-picker">
            <DayPicker
                modifiers={modifiers}
                selectedDays={[date]}
                month={month}
                modifiersStyles={modifiersStyles}
                disabledDays={disabledDays}
                todayButton="Today"
                captionElement={captionElement}
                renderDay={renderDay}
                onDayClick={handleDayClick}
                {...rest}
            />
        </div>
    );
};

DatePicker.propTypes = {
    selectedDay: PropTypes.objectOf(Date),
    month: PropTypes.objectOf(Date),
    disabledDays: PropTypes.array,
    modifiers: PropTypes.object,
    shouldShowYearPicker: PropTypes.bool,
    customContent: PropTypes.array,
    modifiersStyles: PropTypes.object,
};

const renderContent = (currentDate, day, content) => {
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

renderContent.propTypes = {
    currentDate: PropTypes.objectOf(Date).isRequired,
    day: PropTypes.objectOf(Date).isRequired,
    content: PropTypes.object.isRequired,
};

const YearMonthForm = ({ date, onChange }) => {
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

YearMonthForm.propTypes = {
    date: PropTypes.objectOf(Date).isRequired,
    onChange: PropTypes.func.isRequired,
};
