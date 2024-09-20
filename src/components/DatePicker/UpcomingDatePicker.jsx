import clsx from "clsx";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React from "react";

export const UpcomingDatePicker = ({ value, upcomingDates, onChange, onMonthChange }) => {
    return (
        <div className="rounded-l-lg border-r border-gray pt-8">
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
                                    "mx-6 mt-3 flex min-w-40 cursor-pointer items-center justify-center",
                                    "rounded border border-gray py-3 hover:border-blue hover:bg-blue hover:text-white",
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
                <div className="mx-6 mt-7 max-w-40 items-center justify-center rounded bg-yellow-lighter p-3">
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
