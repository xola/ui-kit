import clsx from "clsx";
import dayjs from "dayjs";
import { forwardRef, useState } from "react";
import DayPicker from "react-day-picker";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import "./DatePicker.css";
import { Input } from "./Forms/Input";

const expectedFormat = "ddd, MMM DD, YYYY";
const today = dayjs();

const InputComponent = forwardRef((props, ref) => {
    return <Input size="small" readOnly={true} className="cursor-pointer" {...props} />;
});

export const DatePickerInput = ({
    inputComponent = InputComponent,
    selectedDay = new Date(2021, 6, 22),
    showOverlay = false,
    datePickerProps = { todayButton: "Today" },
}) => {
    const [date, setDate] = useState(selectedDay);

    const handleDayChange = (day, options) => {
        console.assert(!options.disabled, "Date is disabled");
        console.log("Day is " + dayjs(day).format("ddd, YYYY-MMDD"));
        setDate(day);
    };

    const formatSelectedDate = (selectedDate) => {
        // console.log("formatDate", selectedDate);
        return dayjs(selectedDate).format(expectedFormat);
    };

    return (
        <DayPickerInput
            component={inputComponent}
            placeholder={dayjs().format(expectedFormat)}
            onDayChange={handleDayChange}
            showOverlay={showOverlay}
            formatDate={formatSelectedDate}
            dayPickerProps={datePickerProps}
        />
    );
};

export const DatePicker = ({
    selectedDay,
    month = new Date(),
    disabledDays = [],
    modifiers = {},
    showYearPicker = false,
    customContent = {},
    modifiersStyles = {}, // This can be hard-coded in the UI Kit component
    ...rest
}) => {
    const [date, setDate] = useState(selectedDay);

    const handleDayClick = (day, options = {}) => {
        console.log(options.disabled, "Day is", dayjs(day).format("YYYY-MM-DD"));
        setDate(day);
    };

    let captionElement;
    if (showYearPicker) {
        captionElement = ({ date }) => <YearMonthForm date={date} onChange={handleDayClick} />;
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
                onDayClick={handleDayClick}
                selectedDays={date}
                month={month}
                modifiersStyles={modifiersStyles}
                disabledDays={disabledDays}
                todayButton={"Today"}
                captionElement={captionElement}
                renderDay={renderDay}
                {...rest}
            />
        </div>
    );
};

function renderContent(currentDate, day, content) {
    const date = day.getDate();
    const value = content[date] ?? "N/A";
    const isSameDay = dayjs(currentDate).isSame(day, "day");

    return (
        <div className="w-10 h-10">
            <div className={clsx(isSameDay ? "text-white" : "text-black")}>{date}</div>
            <span className={clsx("text-sm", isSameDay ? "text-white" : "text-gray-dark")}>{value}</span>
        </div>
    );
}

function YearMonthForm({ date, onChange }) {
    const months = [...Array(12).keys()].map((m) => today.month(m).format("MMM"));
    const years = [...Array(10).keys()].map((y) => today.year(2021 + y).format("YYYY"));

    const handleChange = function handleChange(e) {
        const { year, month } = e.target.form;
        onChange(new Date(year.value, month.value));
    };

    return (
        <form className="DayPicker-Caption">
            <select name="month" onChange={handleChange} value={date.getMonth()} className="month-selector">
                {months.map((month, i) => (
                    <option key={month} value={i}>
                        {month}
                    </option>
                ))}
            </select>
            <select name="year" onChange={handleChange} value={date.getFullYear()} className="year-selector">
                {years.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
        </form>
    );
}

// TODO: Describe structure of disabledDays http://react-day-picker.js.org/examples/disabled
// TODO: Describe structure of modifiers
// TODO: Describe structure of modifiersStyles
// TODO: Locationlization http://react-day-picker.js.org/docs/localization#advanced
