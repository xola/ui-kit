import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import "./DatePicker.css";
import dayjs from "dayjs";
import { sortBy } from "lodash";
import { Day } from "./Day";
import { MonthYearSelector } from "./MonthYearSelector";
import { NavbarElement } from "./NavbarElement";
import { RelativeDateRange } from "./RelativeDateRange";

const variants = {
    single: "single",
    range: "range",
};

/**
 * Figma Design link: https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%F0%9F%9B%A0-Xola-DS-Desktop-Master-%F0%9F%9B%A0?node-id=2689%3A101580
 */
export const DatePicker = ({
    variant = variants.single,
    value,
    getDayContent,
    disabledDays = [],
    shouldShowYearPicker = false,
    onChange,
    onMonthChange,
    modifiers = {},
    ranges,
    shouldShowRelativeRanges = false,
    components = {},
    upcomingDates,
    ...rest
}) => {
    const initialValue = variant === variants.single ? value : value.from;
    const [currentMonth, setCurrentMonth] = useState(initialValue);
    const [rangeName, setRangeName] = useState("");
    const isRangeVariant = variant === variants.range;

    // Sync internal month state with outside.
    useEffect(() => {
        onMonthChange?.(currentMonth);
    }, [currentMonth, onMonthChange]);

    const handleDayClick = (day, options, event) => {
        setRangeName("");
        if (isRangeVariant) {
            if (value.from && value.to) {
                // This allows us to easily select another date range,
                // if both dates are selected.
                onChange({ from: day, to: null }, options, event);
            } else if ((value.from || value.to).getTime() === day.getTime()) {
                onChange(
                    { from: dayjs(day).startOf("day").toDate(), to: dayjs(day).endOf("day").toDate() },
                    options,
                    event,
                );
            } else {
                onChange(DateUtils.addDayToRange(day, value), options, event);
            }
        } else {
            onChange(day, options, event);
        }
    };

    const handleRelativeRangeChanged = (rangeName, range) => {
        setCurrentMonth(range.from);
        onChange(range, modifiers, null);
    };

    const handleMonthChange = (m) => {
        setCurrentMonth(m);
        onMonthChange?.(m);
    };

    const captionElement = shouldShowYearPicker
        ? ({ date }) => <MonthYearSelector date={date} currentMonth={currentMonth} onChange={handleMonthChange} />
        : undefined;

    const renderDay = (date) => {
        return <Day selectedDate={value} date={date} getContent={getDayContent} currentMonth={currentMonth} />;
    };

    const rangeModifier = isRangeVariant ? { start: value.from, end: value.to } : null;

    // Comparing `from` and `to` dates hides a weird CSS style when you select the same date twice in a date range.
    const useDateRangeStyle = isRangeVariant && value.from?.getTime() !== value.to?.getTime();

    const sortedUpcomingDates = sortBy(upcomingDates?.filter((date) => dayjs(date).isAfter(dayjs(value)))).slice(0, 6);

    return (
        <>
            <div className="flex">
                {upcomingDates ? (
                    <div className="rounded-l-lg border-r border-gray p-6 pt-8">
                        <p className="mb-2 text-lg font-bold">Upcoming</p>
                        {sortedUpcomingDates?.length > 0 ? (
                            <div className="mt-5">
                                {sortedUpcomingDates?.map((date, index) => (
                                    <div
                                        key={index.toString()}
                                        className="mt-3 flex min-w-[160px] cursor-pointer items-center justify-center rounded border border-gray py-3 hover:border-blue hover:bg-blue hover:text-white"
                                        onClick={(event) => {
                                            handleDayClick(date, {}, event);
                                            handleMonthChange(date);
                                        }}
                                    >
                                        {dayjs(date).format("ddd DD MMMM")}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="mt-7 max-w-[160px] items-center justify-center rounded bg-yellow-lighter p-3">
                                There is no future availability for this product.
                            </div>
                        )}
                    </div>
                ) : null}

                <DayPicker
                    showOutsideDays
                    className={clsx(
                        "ui-date-picker rounded-lg pt-3",
                        useDateRangeStyle ? "date-range-picker" : null,
                        getDayContent ? "has-custom-content" : null,
                        sortedUpcomingDates ? "rounded-r-lg " : "rounded-lg",
                    )}
                    todayButton="Today"
                    selectedDays={value}
                    month={currentMonth}
                    modifiers={{ ...modifiers, ...rangeModifier }}
                    numberOfMonths={isRangeVariant ? 2 : 1}
                    disabledDays={disabledDays}
                    captionElement={captionElement}
                    renderDay={renderDay}
                    navbarElement={NavbarElement}
                    onDayClick={handleDayClick}
                    onMonthChange={handleMonthChange}
                    onTodayButtonClick={handleDayClick}
                    {...rest}
                />
            </div>

            {components.Footer ? <components.Footer /> : null}

            {useDateRangeStyle && shouldShowRelativeRanges && (
                <div className="px-5 pb-5">
                    <RelativeDateRange value={rangeName} ranges={ranges} onChange={handleRelativeRangeChanged} />
                </div>
            )}
        </>
    );
};

DatePicker.propTypes = {
    variant: PropTypes.oneOf(Object.keys(variants)),
    value: PropTypes.objectOf(Date),
    upcomingDates: PropTypes.arrayOf(Date),
    onChange: PropTypes.func.isRequired,
    onMonthChange: PropTypes.func,
    disabledDays: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
    shouldShowYearPicker: PropTypes.bool,
    getDayContent: PropTypes.func,
    modifiers: PropTypes.object,
    ranges: PropTypes.arrayOf(PropTypes.oneOf(["day", "week", "month", "quarter", "year"])),
    shouldShowRelativeRanges: PropTypes.bool,
    components: PropTypes.shape({ Footer: PropTypes.node }),
};
