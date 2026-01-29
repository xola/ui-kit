import dayjs from "dayjs";
import React from "react";
import cn from "../../helpers/classnames";

export interface UpcomingDatePickerProps {
    value?: Date | { from?: Date; to?: Date } | null;
    upcomingDates: Date[];
    onChange: (day: Date, options: Record<string, any>, event: React.MouseEvent) => void;
    onMonthChange: (month: Date) => void;
}

export const UpcomingDatePicker = ({ value, upcomingDates, onChange, onMonthChange }: UpcomingDatePickerProps) => {
    return (
        <div className="rounded-l-lg border-r border-gray pt-8">
            <p className="mb-2 px-6 text-lg font-bold">Upcoming</p>
            {upcomingDates?.length > 0 ? (
                <div className="mt-5">
                    {upcomingDates?.map((date) => {
                        const isSameDay = dayjs(date).isSame(dayjs(value as Date), "day");
                        const key = dayjs(date).format();
                        return (
                            <div
                                key={key}
                                className={cn(
                                    "mx-6 mt-3 flex min-w-40 cursor-pointer items-center justify-center",
                                    "rounded border border-gray py-3 hover:border-blue hover:bg-blue hover:text-white",
                                    { "border-blue bg-blue text-white": isSameDay },
                                )}
                                onClick={(event: React.MouseEvent<HTMLDivElement>) => {
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
