import clsx from "clsx";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { forwardRef, useState } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { formatDate } from "../../helpers/date";
import { Input } from "../Forms/Input";
import { DatePicker, navbarElement } from "./DatePicker";

let datePickerInputReference = null;
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
                datePickerInputReference.hideDayPicker();
            }, 500);
        };

        return (
            <div
                className={clsx(classNames.overlayWrapper, "z-50")}
                tabIndex={tabIndex}
                onBlur={onBlur}
                onFocus={focusWrapper}
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

    return (
        <DayPickerInput
            // eslint-disable-next-line no-return-assign
            ref={(reference) => (datePickerInputReference = reference)}
            inputProps={{ date: formatDate(date, dateFormat) }}
            component={inputComponent}
            placeholder={dayjs().format(dateFormat)}
            showOverlay={shouldShowOverlay}
            formatDate={formatSelectedDate}
            overlayComponent={overlayComponent}
            onDayChange={handleDayChange}
        />
    );
};

DatePickerInput.propTypes = {
    inputComponent: PropTypes.element,
    selectedDate: PropTypes.oneOfType([Date]),
    dateFormat: PropTypes.string,
    shouldShowOverlay: PropTypes.bool,
    datePickerProps: PropTypes.object,
    handleDayChange: PropTypes.func,
};

const InputComponent = forwardRef((props, _reference) => {
    const { date, value, ...newProps } = props;
    return <Input readOnly size="small" className="cursor-pointer" value={date} {...newProps} />;
});
