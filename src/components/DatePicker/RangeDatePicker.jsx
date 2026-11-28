import PropTypes from "prop-types";
import React from "react";
import { isSame, now } from "../../utils/date";
import { LocalizedDayPicker } from "./LocalizedDayPicker";
import { useDayPickerComponents } from "./dayPickerComponents";

export const RangeDatePicker = ({
    shouldShowYearPicker,
    leftMonth,
    rightMonth,
    value,
    locale,
    timezoneName,
    dayPickerProps,
    isDayDisabled,
    onDayClick,
    onLeftMonthChange,
    onRightMonthChange,
}) => {
    const leftCaptionOptions = { shouldShowYearPicker, locale, month: leftMonth, onMonthChange: onLeftMonthChange };
    const rightCaptionOptions = { shouldShowYearPicker, locale, month: rightMonth, onMonthChange: onRightMonthChange };
    const leftComponents = useDayPickerComponents(leftCaptionOptions);
    const rightComponents = useDayPickerComponents(rightCaptionOptions);
    const isSingleDayDateRange = isSame(now(value?.from, timezoneName), now(value?.to, timezoneName));

    const isRightDayDisabled = (date) => {
        const isDateBeforeStartDate = now(date, timezoneName).isBefore(value?.from, "day");

        return isDayDisabled(date) || (isDateBeforeStartDate && !isSingleDayDateRange);
    };

    return (
        <div className="flex gap-4">
            <LocalizedDayPicker
                localeCode={locale}
                month={leftMonth}
                disabled={isDayDisabled}
                components={leftComponents}
                onDayClick={onDayClick}
                onMonthChange={onLeftMonthChange}
                {...dayPickerProps}
            />
            <LocalizedDayPicker
                localeCode={locale}
                month={rightMonth}
                disabled={isRightDayDisabled}
                components={rightComponents}
                onDayClick={onDayClick}
                onMonthChange={onRightMonthChange}
                {...dayPickerProps}
            />
        </div>
    );
};

RangeDatePicker.propTypes = {
    shouldShowYearPicker: PropTypes.bool,
    leftMonth: PropTypes.instanceOf(Date),
    rightMonth: PropTypes.instanceOf(Date),
    value: PropTypes.object,
    locale: PropTypes.string,
    timezoneName: PropTypes.string,
    dayPickerProps: PropTypes.object.isRequired,
    isDayDisabled: PropTypes.func.isRequired,
    onDayClick: PropTypes.func.isRequired,
    onLeftMonthChange: PropTypes.func.isRequired,
    onRightMonthChange: PropTypes.func.isRequired,
};
