import PropTypes from "prop-types";
import React from "react";
import { MonthSelector } from "./MonthSelector";
import { MonthYearSelector } from "./MonthYearSelector";

export const createCaptionElement = ({
    shouldShowYearPicker,
    shouldShowMonthSelector = false,
    currentMonth,
    locale,
    onChange,
}) => {
    if ((!shouldShowYearPicker && !shouldShowMonthSelector) || !currentMonth) {
        return undefined;
    }

    const Caption = ({ calendarMonth, className, id }) => {
        const { date } = calendarMonth;

        return (
            <div id={id} className={className}>
                {shouldShowMonthSelector ? (
                    <MonthSelector date={date} currentMonth={currentMonth} locale={locale} onChange={onChange} />
                ) : (
                    <MonthYearSelector date={date} currentMonth={currentMonth} locale={locale} onChange={onChange} />
                )}
            </div>
        );
    };

    Caption.propTypes = {
        calendarMonth: PropTypes.shape({ date: PropTypes.instanceOf(Date).isRequired }).isRequired,
        className: PropTypes.string,
        id: PropTypes.string,
    };

    return Caption;
};
