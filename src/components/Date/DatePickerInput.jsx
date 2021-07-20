import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { forwardRef, useState } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { formatDate } from "../../helpers/date";
import { Input } from "../Forms/Input";
import { navbarElement } from "./DatePicker";

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
    datePickerProps.navbarElement = navbarElement;
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
