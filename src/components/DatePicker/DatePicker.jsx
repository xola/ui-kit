import dayjs from "dayjs";
import { isArray, isFunction } from "lodash-es";
import PropTypes from "prop-types";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import { Tooltip } from "../..";
import cn from "../../helpers/classnames";
import { isSame, isValidTimeZoneName, now, toDate } from "../../helpers/date";
import { Context } from "../Provider";
import "./DatePicker.css";
import { Day } from "./Day";
import { LocalizedDayPicker } from "./LocalizedDayPicker";
import { MonthYearSelector } from "./MonthYearSelector";
import { NavbarElement } from "./NavbarElement";
import RangeDatePicker from "./RangeDatePicker";
import { RelativeDateRange } from "./RelativeDateRange";
import { UpcomingDatePicker } from "./UpcomingDatePicker";

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
    locale,
    timezoneName = null, // seller timezone (e.g. "America/Los_Angeles") to return correct today date
    ...rest
}) => {
    const { locale: contextLocale } = useContext(Context);
    const initialValue = value ? (variant === variants.single ? value : value.from) : null;
    const [currentMonth, setCurrentMonth] = useState(initialValue ?? now(null, timezoneName).toDate());
    const [startMonth, setStartMonth] = useState(() => {
        if (!value || !value.from) {
            return new Date();
        }

        return value.from;
    });
    const [endMonth, setEndMonth] = useState(() => {
        if (!value || !value.to || !value.from) {
            return now(null, timezoneName).add(1, "month").toDate();
        }

        return isSame(now(value.to, timezoneName), now(value.from, timezoneName), "month")
            ? now(value.from, timezoneName).add(1, "month").toDate()
            : value.to;
    });
    const [rangeName, setRangeName] = useState("");
    const isRangeVariant = variant === variants.range;
    const isValidValue = value && value.from && value.to;

    // Sync internal month state with outside.
    // Todo: This might not be required, as we have onMonthChange callback in handleMonthChange and other callbacks too. This causes the onMonthChange to be called more than once.
    useEffect(() => {
        onMonthChange?.(currentMonth);
    }, [currentMonth, onMonthChange]);

    useEffect(() => {
        if (timezoneName && !isValidTimeZoneName(timezoneName)) {
            console.log(`${timezoneName} is not a valid timezone. Using default timezone now`);
            dayjs.tz.setDefault();
        }
    }, [timezoneName]);

    const handleTodayClick = (day, options, event) => {
        if (isRangeVariant) {
            return;
        }

        const today = timezoneName ? toDate(now(day, timezoneName)) : new Date();

        if (options.disabled || isDisabled(today)) {
            setCurrentMonth(today);
            onMonthChange?.(today);
        } else {
            onChange(today, options, event);
        }
    };

    const isDisabled = (date) => {
        if (isArray(disabledDays)) {
            return disabledDays.some((_date) => isSame(now(_date, timezoneName), date, "day"));
        }

        if (isFunction(disabledDays)) {
            return disabledDays(date);
        }

        return disabledDays(date);
    };

    const handleRelativeRangeChanged = (rangeName, range) => {
        setCurrentMonth(range.from);
        setStartMonth(range.from);
        setEndMonth(range.to);
        onChange({ ...range, rangeName }, modifiers, null);
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

        if (isSame(now(value?.from, timezoneName), now(day, timezoneName), "month")) {
            handleStartMonthChange(day);
        }

        setRangeName("");
        if (isRangeVariant) {
            if (isValidValue) {
                // This allows us to easily select another date range,
                // if both dates are selected.
                onChange({ from: toDate(now(day, timezoneName).startOf("day")), to: null }, options, event);
            } else if (value && (value.from || value.to) && (value.from || value.to).getTime() === day.getTime()) {
                const from = toDate(now(day, timezoneName).startOf("day"));
                const to = toDate(now(day, timezoneName).endOf("day"), false);

                onChange({ from, to }, options, event);
            } else if (value.from && DateUtils.isDayBefore(value.from, toDate(now(day, timezoneName)))) {
                // this works if the user first clicked on the date that will go to "from", and the second click to "to"
                onChange(
                    DateUtils.addDayToRange(toDate(now(day, timezoneName).endOf("day"), false), value),
                    options,
                    event,
                );
            } else if (
                value.from &&
                (DateUtils.isDayAfter(value.from, toDate(now(day, timezoneName))) ||
                    DateUtils.isSameDay(value.from, toDate(now(day, timezoneName))))
            ) {
                // this works if the user first clicked on the date that will go to "to", and the second click to "from"
                // also this works when the user has selected one date
                onChange(
                    {
                        from: toDate(now(day, timezoneName).startOf("day")),
                        to: toDate(now(value.from).endOf("day"), false),
                    },
                    options,
                    event,
                );
            } else {
                // Fallback when value.from is null
                onChange(
                    DateUtils.addDayToRange(toDate(now(day, timezoneName).endOf("day"), false), value),
                    options,
                    event,
                );
            }
        } else {
            onChange(toDate(now(day, timezoneName)), options, event);
        }
    };

    // TODO: Should be outside this component because this returns JSX
    const CaptionElement = useMemo(() => {
        return shouldShowYearPicker && currentMonth
            ? ({ date }) => (
                  <MonthYearSelector
                      date={date}
                      currentMonth={currentMonth}
                      locale={locale ?? contextLocale}
                      onChange={handleMonthChange}
                  />
              )
            : undefined;
        // Adding `handleMonthChange` causes a lot of re-renders, and closes drop-down.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shouldShowYearPicker, currentMonth]);

    // TODO: Should be outside this component because this returns JSX
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
    const selectedDays = value && (dayjs.isDayjs(value) || isRangeVariant ? value : now(value, timezoneName).toDate());

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
                        locale={locale ?? contextLocale}
                        timezoneName={timezoneName}
                        {...rest}
                    />
                ) : (
                    <LocalizedDayPicker
                        className={cn(
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

            {shouldShowRelativeRanges && (
                <div className="max-w-200 ">
                    <div className="ml-auto w-5/12">
                        <RelativeDateRange
                            value={rangeName}
                            ranges={ranges}
                            timezoneName={timezoneName}
                            onChange={handleRelativeRangeChanged}
                            onSubmit={onSubmitDateRange}
                        />
                    </div>
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
    locale: PropTypes.string,
    timezoneName: PropTypes.string,
};
