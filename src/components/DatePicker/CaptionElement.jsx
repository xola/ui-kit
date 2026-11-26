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

    const Caption = ({ date }) => {
        return shouldShowMonthSelector ? (
            <MonthSelector date={date} currentMonth={currentMonth} locale={locale} onChange={onChange} />
        ) : (
            <MonthYearSelector date={date} currentMonth={currentMonth} locale={locale} onChange={onChange} />
        );
    };

    Caption.propTypes = {
        date: PropTypes.instanceOf(Date).isRequired,
    };

    return Caption;
};
