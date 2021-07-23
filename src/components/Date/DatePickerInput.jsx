import clsx from "clsx";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { forwardRef, useState } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { formatDate } from "../../helpers/date";
import { Input } from "../Forms/Input";
import { DatePicker } from "./DatePicker";

let datePickerInputReference = null;
export const DatePickerInput = ({
    inputComponent = InputComponent,
    selectedDate = new Date(),
    range,
    dateFormat = "ddd, MMM DD, YYYY",
    shouldShowOverlay = false,
    handleDayChange,
}) => {
    // TODO: Refactor to use date ranges
    const [date, setDate] = useState(selectedDate);

    if (!handleDayChange) {
        // TODO: Cleanup handling
        handleDayChange = (day, options) => {
            console.assert(!options.disabled, "Date is disabled");
            console.log("DatePickerInput Day is " + formatDate(date, dateFormat));
            setDate(day);
            setTimeout(() => {
                datePickerInputReference.hideDayPicker();
            }, 100);
        };
    }

    const formatSelectedDate = (date) => formatDate(date, dateFormat);

    const overlayComponent = ({ month, onBlur, onFocus, selectedDay, classNames, tabIndex }) => {
        return (
            <div
                className={clsx(classNames.overlayWrapper, "z-50")}
                tabIndex={tabIndex}
                onBlur={onBlur}
                onFocus={onFocus}
            >
                <div className={classNames.overlay}>
                    <DatePicker
                        selectedDate={selectedDay}
                        range={range}
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
    range: PropTypes.number,
    dateFormat: PropTypes.string,
    shouldShowOverlay: PropTypes.bool,
    handleDayChange: PropTypes.func,
};

const InputComponent = forwardRef((props, _reference) => {
    const { date, value, ...newProps } = props;
    return <Input readOnly size="small" className="cursor-pointer" value={date} {...newProps} />;
});
