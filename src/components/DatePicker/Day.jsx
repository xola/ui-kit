import clsx from "clsx";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React from "react";

export const Day = ({ selectedDate, day, getContent }) => {
    if (getContent) {
        return <DayContent selectedDate={selectedDate} day={day} getContent={getContent} />;
    }

    const isSameDay = selectedDate && dayjs(selectedDate).isSame(day, "day");

    return (
        <div
            className={clsx(
                "ui-date-picker-day",
                "date flex h-full w-full items-center justify-center",
                isSameDay ? "selected text-white" : null,
            )}
        >
            {day.getDate()}
        </div>
    );
};

Day.propTypes = {
    selectedDate: PropTypes.objectOf(Date),
    day: PropTypes.objectOf(Date),
    getContent: PropTypes.func,
};

/**
 * Render custom content in the cell and mark the active day
 */
const DayContent = ({ selectedDate, day, getContent }) => {
    const date = day.getDate();
    const value = getContent(date) ?? "N/A";
    const isSameDay = selectedDate && dayjs(selectedDate).isSame(day, "day");
    const shouldShowContent = !dayjs(day).isBefore(dayjs(), "day");

    return (
        <div className="ui-day-content">
            {/* The date itself */}
            <div className={clsx("ui-day-content-value", isSameDay ? "selected text-white" : null)}>{date}</div>

            {/* The custom content below it */}
            {shouldShowContent ? <div className="ui-day-content-custom">{value}</div> : null}
        </div>
    );
};

DayContent.propTypes = {
    selectedDate: PropTypes.objectOf(Date),
    day: PropTypes.objectOf(Date),
    getContent: PropTypes.func.isRequired,
};
