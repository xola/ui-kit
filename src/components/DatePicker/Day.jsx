import dayjs from "dayjs";
import PropTypes from "prop-types";
import React from "react";
import cn from "../../helpers/classnames";

export const Day = ({ selectedDate, date, getContent, currentMonth, disabled = false }) => {
    const isSameMonth = dayjs(currentMonth).isSame(date, "month");
    if (getContent && isSameMonth) {
        return <DayContent selectedDate={selectedDate} date={date} getContent={getContent} />;
    }

    const isSameDay = selectedDate && dayjs(selectedDate).isSame(date, "day");

    return (
        <div
            className={cn(
                "ui-date-picker-day",
                "flex items-center justify-center",
                isSameDay && isSameMonth && !disabled ? "selected text-white" : null,
                isSameMonth ? "date" : null,
            )}
        >
            {date.getDate()}
        </div>
    );
};

Day.propTypes = {
    selectedDate: PropTypes.objectOf(Date),
    date: PropTypes.objectOf(Date),
    getContent: PropTypes.func,
    currentMonth: PropTypes.objectOf(Date),
};

/**
 * Render custom content in the cell and mark the active day
 */
const DayContent = ({ selectedDate, date, getContent }) => {
    const day = date.getDate();
    const contentValue = getContent(day, date);
    const isSameDay = selectedDate && dayjs(selectedDate).isSame(date, "day");

    return (
        <div className="ui-day-content align-center flex flex-col justify-center">
            {/* The date itself */}
            <div className={cn("ui-day-content-value", { "selected text-white": isSameDay })}>{day}</div>

            {/* The custom content below it */}
            {contentValue ? <div className="ui-day-content-custom mt-1">{contentValue}</div> : null}
        </div>
    );
};

DayContent.propTypes = {
    selectedDate: PropTypes.objectOf(Date),
    date: PropTypes.objectOf(Date),
    getContent: PropTypes.func.isRequired,
};
