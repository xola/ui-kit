import clsx from "clsx";
import dayjs from "dayjs";
import React from "react";
import { Dot } from "../Dot/Dot";

export interface DayProps {
    readonly selectedDate?: Date | { from?: Date; to?: Date } | null;
    date: Date;
    currentMonth: Date;
    readonly isLoading?: boolean;
    readonly disabled?: boolean;
    readonly getContent?: (day: number, date: Date) => React.ReactNode;
}

export const Day = ({
    selectedDate,
    date,
    currentMonth,
    isLoading = false,
    disabled = false,
    getContent,
}: DayProps) => {
    const isSameMonth = dayjs(currentMonth).isSame(date, "month");

    if (getContent && isSameMonth) {
        if (isLoading) {
            return (
                <div className="flex animate-pulse items-center justify-center">
                    <Dot className="ui-day-content pointer-events-none !cursor-not-allowed" color="secondary" />
                </div>
            );
        }

        return <DayContent selectedDate={selectedDate} date={date} getContent={getContent} />;
    }

    if (isLoading) {
        return (
            <div className="flex animate-pulse items-center justify-center">
                <Dot className="pointer-events-none !cursor-not-allowed" color="secondary" size="xlarge" />
            </div>
        );
    }

    const isSameDay = selectedDate && selectedDate instanceof Date && dayjs(selectedDate).isSame(date, "day");

    return (
        <div
            className={clsx(
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

interface DayContentProps {
    readonly selectedDate?: Date | { from?: Date; to?: Date } | null;
    date: Date;
    getContent: (day: number, date: Date) => React.ReactNode;
}

/**
 * Render custom content in the cell and mark the active day
 */
const DayContent = ({ selectedDate, date, getContent }: DayContentProps) => {
    const day = date.getDate();
    const contentValue = getContent(day, date);
    const isSameDay = selectedDate && selectedDate instanceof Date && dayjs(selectedDate).isSame(date, "day");

    return (
        <div className="ui-day-content align-center flex flex-col justify-center">
            {/* The date itself */}
            <div className={clsx("ui-day-content-value", { "selected text-white": isSameDay })}>{day}</div>

            {/* The custom content below it */}
            {contentValue ? <div className="ui-day-content-custom mt-1">{contentValue}</div> : null}
        </div>
    );
};
