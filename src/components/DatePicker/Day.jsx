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
                "date flex items-center w-full h-full justify-center",
                isSameDay ? "text-white selected" : null,
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
    const isSameMonth = dayjs().isSame(day, "month");

    return (
        <>
            {/* The date itself */}
            <div className={clsx("date-value mb-1 leading-p1", isSameDay ? "text-white selected" : null)}>{date}</div>

            {/* The custom content below it */}
            <div
                className={clsx(
                    "custom-content text-xs leading-p3",
                    isSameDay ? "text-white" : isSameMonth ? "text-gray-dark" : "text-gray-light",
                )}
            >
                {value}
            </div>
        </>
    );
};

DayContent.propTypes = {
    selectedDate: PropTypes.objectOf(Date),
    day: PropTypes.objectOf(Date),
    getContent: PropTypes.func.isRequired,
};
