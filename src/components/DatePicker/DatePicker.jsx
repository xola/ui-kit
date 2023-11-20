import clsx from "clsx";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import "./DatePicker.css";
import { isArray, isFunction } from "lodash";
import { Tooltip } from "../..";
import { Day } from "./Day";
import { MonthYearSelector } from "./MonthYearSelector";
import { RelativeDateRange } from "./RelativeDateRange";
import RangeDatePicker from "./RangeDatePicker";
import { UpcomingDatePicker } from "./UpcomingDatePicker";
import { NavbarElement } from "./NavbarElement";

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
    onSubmitDateRange,
    modifiers = {},
    ranges,
    shouldShowRelativeRanges = false,
    components = {},
    getTooltip,
    upcomingDates,
    timezoneName = null, // seller timezone (e.g. "America/Los_Angeles") to return correct today date
    ...rest
}) => {
    const initialValue = value ? (variant === variants.single ? value : value.from) : null;
    const [currentMonth, setCurrentMonth] = useState(initialValue ?? dayjs().toDate());
    const [startMonth, setStartMonth] = useState(value?.from);
    const [endMonth, setEndMonth] = useState(
        dayjs(value?.to).isSame(dayjs(value?.from), "month")
            ? dayjs(value?.from).add(1, "month").toDate()
            : value?.to ?? dayjs(value?.from).add(1, "month").toDate(),
    );
    const [rangeName, setRangeName] = useState("");
    const isRangeVariant = variant === variants.range;
    const isValidValue = value && value.from && value.to;

    // Sync internal month state with outside.
    useEffect(() => {
        onMonthChange?.(currentMonth);
    }, [currentMonth, onMonthChange]);

    const handleTodayClick = (day, options, event) => {
        if (isRangeVariant) {
            return;
        }

        const today = timezoneName ? dayjs().tz(timezoneName).toDate() : new Date();

        if (options.disabled || isDisabled(today)) {
            setCurrentMonth(today);
            onMonthChange?.(today);
        } else {
            onChange(day, options, event);
        }
    };

    const isDisabled = (date) => {
        if (isArray(disabledDays)) {
            return disabledDays.some((_date) => dayjs(_date).isSame(date, "day"));
        }

        if (isFunction(disabledDays)) {
            return disabledDays(date);
        }

        return disabledDays(date);
    };

    const handleRelativeRangeChanged = (rangeName, range) => {
        setCurrentMonth(range.from);
        setStartMonth(range.from);
        onChange(range, modifiers, null);
    };

    const handleMonthChange = (m) => {
        setCurrentMonth(m);
        onMonthChange?.(m);
    };

    const handleStartMonthChange = (m) => {
        setStartMonth(m);
        onMonthChange?.(m);
    };

    const handleEndMonthChange = (m) => {
        setEndMonth(m);
        onMonthChange?.(m);
    };

    const handleDayClick = (day, options, event) => {
        if (options.disabled) {
            return;
        }

        if (dayjs(value?.from).isSame(day, "month")) {
            handleStartMonthChange(day);
        }

        setRangeName("");
        if (isRangeVariant) {
            if (isValidValue) {
                // This allows us to easily select another date range,
                // if both dates are selected.
                onChange({ from: day, to: null }, options, event);
            } else if (value && (value.from || value.to) && (value.from || value.to).getTime() === day.getTime()) {
                const from = dayjs(day).startOf("day").toDate();
                const to = dayjs(day).endOf("day").toDate();

                onChange({ from, to }, options, event);
            } else {
                onChange(DateUtils.addDayToRange(day, value), options, event);
            }
        } else {
            onChange(day, options, event);
        }
    };

    const CaptionElement =
        shouldShowYearPicker && currentMonth
            ? ({ date }) => <MonthYearSelector date={date} currentMonth={currentMonth} onChange={handleMonthChange} />
            : undefined;

    const renderDay = (date) => {
        const tooltipContent = getTooltip?.(date);
        const disabled = isDisabled(date);

        return tooltipContent ? (
            <Tooltip placement="top" content={tooltipContent}>
                <Day
                    disabled={disabled}
                    selectedDate={value}
                    date={date}
                    getContent={getDayContent}
                    currentMonth={currentMonth}
                />
            </Tooltip>
        ) : (
            <Day
                disabled={disabled}
                selectedDate={value}
                date={date}
                getContent={getDayContent}
                currentMonth={currentMonth}
            />
        );
    };

    const rangeModifier = isRangeVariant && isValidValue ? { start: value.from, end: value.to } : null;
    // Comparing `from` and `to` dates hides a weird CSS style when you select the same date twice in a date range.
    const useDateRangeStyle = isRangeVariant && isValidValue && value.from?.getTime() !== value.to?.getTime();
    // Return the same value if it is already dayjs object or has range variant otherwise format it to dayJs object
    const selectedDays = value && (dayjs.isDayjs(value) || isRangeVariant ? value : dayjs(value).toDate());

    return (
        <>
            <div className="flex">
                {upcomingDates ? (
                    <UpcomingDatePicker
                        upcomingDates={upcomingDates}
                        value={value}
                        onChange={handleDayClick}
                        onMonthChange={handleMonthChange}
                    />
                ) : null}

                {isRangeVariant ? (
                    <RangeDatePicker
                        isDateRangeStyle={useDateRangeStyle}
                        shouldShowYearPicker={shouldShowYearPicker}
                        startMonth={startMonth}
                        endMonth={endMonth}
                        modifiers={{ ...modifiers, ...rangeModifier }}
                        getTooltip={getTooltip}
                        disabledDays={disabledDays}
                        getDayContent={getDayContent}
                        value={value}
                        handleDayClick={handleDayClick}
                        handleStartMonthChange={handleStartMonthChange}
                        handleEndMonthChange={handleEndMonthChange}
                        handleTodayClick={handleTodayClick}
                        selectedDays={selectedDays}
                        {...rest}
                    />
                ) : (
                    <DayPicker
                        className={clsx(
                            "ui-date-picker rounded-lg pt-3",
                            useDateRangeStyle ? "date-range-picker" : null,
                            getDayContent ? "has-custom-content" : null,
                            modifiers.waitlist ? "has-custom-content" : null,
                        )}
                        todayButton="Today"
                        selectedDays={selectedDays}
                        month={currentMonth}
                        modifiers={{ ...modifiers, ...rangeModifier }}
                        disabledDays={disabledDays}
                        captionElement={CaptionElement}
                        renderDay={renderDay}
                        navbarElement={NavbarElement}
                        onDayClick={handleDayClick}
                        onMonthChange={handleMonthChange}
                        onTodayButtonClick={handleTodayClick}
                        {...rest}
                    />
                )}
            </div>

            {components.Footer ? <components.Footer /> : null}

            {useDateRangeStyle && shouldShowRelativeRanges && (
                <div className="ml-auto w-6/12 pb-5 pl-5 pr-10">
                    <RelativeDateRange
                        value={rangeName}
                        ranges={ranges}
                        onChange={handleRelativeRangeChanged}
                        onSubmit={onSubmitDateRange}
                    />
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
    isDateRangeStyle: PropTypes.bool,
    isRangeVariant: PropTypes.bool,
    getDayContent: PropTypes.func,
    modifiers: PropTypes.object,
    ranges: PropTypes.arrayOf(PropTypes.oneOf(["day", "week", "month", "quarter", "year"])),
    shouldShowRelativeRanges: PropTypes.bool,
    components: PropTypes.shape({ Footer: PropTypes.oneOfType([PropTypes.node, PropTypes.func]) }),
    getTooltip: PropTypes.func,
    timezoneName: PropTypes.string,
};
