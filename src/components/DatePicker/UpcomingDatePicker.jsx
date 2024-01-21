import React from "react";
import dayjs from "dayjs";
import clsx from "clsx";
import PropTypes from "prop-types";

export const UpcomingDatePicker = ({ value, upcomingDates, onChange, onMonthChange }) => {
    return (
        <div className="border-gray rounded-l-lg border-r pt-8">
            <p className="mb-2 px-6 text-lg font-bold">Upcoming</p>
            {upcomingDates?.length > 0 ? (
                <div className="mt-5">
                    {upcomingDates?.map((date) => {
                        const isSameDay = dayjs(date).isSame(dayjs(value), "day");
                        const key = dayjs(date).format();
                        return (
                            <div
                                key={key}
                                className={clsx(
                                    "min-w-40 mx-6 mt-3 flex cursor-pointer items-center justify-center",
                                    "border-gray hover:border-blue hover:bg-blue rounded border py-3 hover:text-white",
                                    { "border-blue bg-blue text-white": isSameDay },
                                )}
                                onClick={(event) => {
                                    onChange(date, {}, event);
                                    onMonthChange(date);
                                }}
                            >
                                {dayjs(date).format("ddd DD MMMM")}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="max-w-40 bg-yellow-lighter mx-6 mt-7 items-center justify-center rounded p-3">
                    There is no future availability for this product.
                </div>
            )}
        </div>
    );
};

UpcomingDatePicker.propTypes = {
    value: PropTypes.objectOf(Date),
    upcomingDates: PropTypes.arrayOf(Date).isRequired,
    onChange: PropTypes.func.isRequired,
    onMonthChange: PropTypes.func.isRequired,
};
