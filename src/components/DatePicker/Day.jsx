import clsx from "clsx";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React from "react";

export const Day = ({ selectedDate, date, getContent, currentMonth }) => {
    const isSameMonth = dayjs(currentMonth).isSame(date, "month");
    if (getContent && isSameMonth) {
        return <DayContent selectedDate={selectedDate} date={date} getContent={getContent} />;
    }

    const isSameDay = selectedDate && dayjs(selectedDate).isSame(date, "day");

    return (
        <div
            className={clsx(
                "ui-date-picker-day",
                "date flex h-full w-full items-center justify-center",
                isSameDay ? "selected text-white" : null,
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
            <div
                className={clsx("ui-day-content-value", {
                    "selected text-white": isSameDay,
                })}
            >
                {day}
            </div>

            {/* The custom content below it */}
            {contentValue ? <div className="ui-day-content-custom">{contentValue}</div> : null}
        </div>
    );
};

DayContent.propTypes = {
    selectedDate: PropTypes.objectOf(Date),
    date: PropTypes.objectOf(Date),
    getContent: PropTypes.func.isRequired,
};
