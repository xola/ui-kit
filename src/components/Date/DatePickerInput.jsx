import clsx from "clsx";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { forwardRef, useState } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { formatDate } from "../../helpers/date";
import { Input } from "../Forms/Input";
import { DatePicker, navbarElement } from "./DatePicker";

let datePickerInputRef = null;
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

    const formatSelectedDate = (date) => {
        console.log("Formatting", date);
        return formatDate(date, dateFormat);
    };

    const overlayComponent = ({ month, onBlur, onFocus, selectedDay, classNames, tabIndex }) => {
        // Wrap the onFocus call to solve a bug about hiding it. Too many bug reports on GH & SO
        const focusWrapper = (event_) => {
            onFocus(event_);
            setTimeout(() => {
                datePickerInputRef.hideDayPicker();
            }, 100);
        };

        return (
            <div
                className={clsx(classNames.overlayWrapper, "z-50")}
                onBlur={onBlur}
                onFocus={focusWrapper}
                tabIndex={tabIndex}
            >
                <div className={classNames.overlay}>
                    <DatePicker
                        selectedDate={selectedDay}
                        startMonth={month}
                        handleDayClick={handleDayChange}
                        // handleMonthChange={onMonthChange}
                        // handleTodayButtonClick={onTodayClick}
                    />
                </div>
            </div>
        );
    };

    datePickerProps.selectedDays = [date];
    datePickerProps.navbarElement = navbarElement;
    datePickerProps.onTodayButtonClick = (today) => {
        console.log("DatePickerInput onTodayButtonClick", formatDate(today));
        setDate(today);
    };

    return (
        <DayPickerInput
            ref={(ref) => (datePickerInputRef = ref)}
            inputProps={{ date: formatDate(date, dateFormat) }}
            component={inputComponent}
            placeholder={dayjs().format(dateFormat)}
            showOverlay={shouldShowOverlay}
            formatDate={formatSelectedDate}
            onDayChange={handleDayChange}
            overlayComponent={overlayComponent}
        />
    );
};

const InputComponent = forwardRef((props, _reference) => {
    return <Input readOnly size="small" className="cursor-pointer" {...props} value={props.date} />;
});

DatePickerInput.propTypes = {
    inputComponent: PropTypes.element,
    selectedDate: PropTypes.oneOfType([Date]),
    dateFormat: PropTypes.string,
    shouldShowOverlay: PropTypes.bool,
    datePickerProps: PropTypes.object,
    handleDayChange: PropTypes.func,
};
