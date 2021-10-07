import clsx from "clsx";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { forwardRef, useState } from "react";
import DPI from "react-day-picker/DayPickerInput";
import { formatDate } from "../../helpers/date";
import { Input } from "../Forms/Input";
import { DatePicker } from "./DatePicker";
import { Day } from "./Day";

const DayPickerInput = DPI.__esModule ? DPI.default : DPI;
let datePickerInputReference = null;
export const DatePickerInput = ({
    inputComponent = InputComponent,
    selectedDate = new Date(),
    range,
    dateFormat = "ddd, MMM DD, YYYY",
    getDayContent,
    dayPickerProps,
    shouldShowOverlay = false,
    handleDayChange,
}) => {
    // TODO: Refactor to use date ranges when needed
    const [date, setDate] = useState(selectedDate);

    const handleDayClick = (day) => {
        setDate(day);

        if (handleDayChange) {
            handleDayChange(day);
        } else {
            console.warn("Please implement `handleDayChange` to receive a callback when the date changes", date);
        }

        setTimeout(() => {
            datePickerInputReference.hideDayPicker();
        }, 500);
    };

    const formatSelectedDate = (date) => formatDate(date, dateFormat);

    const overlayComponent = ({ onBlur, onFocus, classNames, tabIndex }) => {
        return (
            <div
                className={clsx(classNames.overlayWrapper, "z-50")}
                tabIndex={tabIndex}
                onBlur={onBlur}
                onFocus={onFocus}
            >
                <div className={classNames.overlay}>
                    <DatePicker
                        value={selectedDate}
                        range={range}
                        initialMonth={selectedDate}
                        month={selectedDate}
                        onChange={handleDayClick}
                        getDayContent={getDayContent}
                        {...dayPickerProps}
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
            inputProps={{ date: formatDate(selectedDate, dateFormat) }}
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
    inputComponent: PropTypes.object,
    selectedDate: PropTypes.any, // TODO Fix this
    range: PropTypes.number,
    dateFormat: PropTypes.string,
    shouldShowOverlay: PropTypes.bool,
    handleDayChange: PropTypes.func,
};

const InputComponent = forwardRef((props, _reference) => {
    const { date, value, ...newProps } = props;
    return <Input readOnly size="small" className="cursor-pointer" value={date} {...newProps} />;
});

InputComponent.propTypes = {
    // TODO:Because of errors that I cba to fix now
    date: PropTypes.any,
    value: PropTypes.any,
};
