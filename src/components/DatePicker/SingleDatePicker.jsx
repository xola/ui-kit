import PropTypes from "prop-types";
import React from "react";
import { LocalizedDayPicker } from "./LocalizedDayPicker";
import { useDayPickerComponents } from "./dayPickerComponents";

const TodayButton = ({ label, onClick }) => {
    return (
        <button type="button" className="ui-date-picker-today" onClick={onClick}>
            {label}
        </button>
    );
};

TodayButton.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export const SingleDatePicker = ({
    shouldShowYearPicker,
    shouldShowMonthSelector,
    month,
    todayButton,
    locale,
    dayPickerProps,
    isDayDisabled,
    onDayClick,
    onMonthChange,
    onTodayClick,
}) => {
    const captionOptions = { shouldShowYearPicker, shouldShowMonthSelector, month, locale, onMonthChange };
    const components = useDayPickerComponents(captionOptions);
    const footer = todayButton ? <TodayButton label={todayButton} onClick={onTodayClick} /> : undefined;

    return (
        <LocalizedDayPicker
            localeCode={locale}
            month={month}
            disabled={isDayDisabled}
            footer={footer}
            components={components}
            onDayClick={onDayClick}
            onMonthChange={onMonthChange}
            {...dayPickerProps}
        />
    );
};

SingleDatePicker.propTypes = {
    shouldShowYearPicker: PropTypes.bool,
    shouldShowMonthSelector: PropTypes.bool,
    month: PropTypes.instanceOf(Date),
    todayButton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    locale: PropTypes.string,
    dayPickerProps: PropTypes.object.isRequired,
    isDayDisabled: PropTypes.func.isRequired,
    onDayClick: PropTypes.func.isRequired,
    onMonthChange: PropTypes.func.isRequired,
    onTodayClick: PropTypes.func.isRequired,
};
