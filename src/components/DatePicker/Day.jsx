import clsx from "clsx";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React from "react";

export const Day = ({ selectedDate, day }) => {
    const isSameDay = selectedDate && dayjs(selectedDate).isSame(day, "day");

    return (
        <div
            className={clsx(
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
};
