import clsx from "clsx";
import dayjs from "dayjs";
import { isArray, isFunction } from "lodash";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import "./DatePicker.css";
import { Tooltip } from "../..";
import { isSame, isValidTimeZoneName, now, toDate } from "../../helpers/date";
import { Context } from "../Provider";
import { Day } from "./Day";
import { LocalizedDayPicker } from "./LocalizedDayPicker";
import { MonthYearSelector } from "./MonthYearSelector";
import { MonthSelector } from "./MonthSelector";
import { NavbarElement } from "./NavbarElement";
import RangeDatePicker from "./RangeDatePicker";
import { RelativeDateRange } from "./RelativeDateRange";
import { UpcomingDatePicker } from "./UpcomingDatePicker";

const variants = {
    single: "single",
    range: "range",
} as const;

type DatePickerVariant = keyof typeof variants;
type DateValue = Date | { from?: Date; to?: Date };
type RangeKey = "day" | "week" | "month" | "quarter" | "year";

export interface DatePickerProps {
    [key: string]: any;
    variant?: DatePickerVariant;
    value?: DateValue;
    selectedDays?: DateValue;
    upcomingDates?: Date[];
    disabledDays?: ((date: Date) => boolean) | Date[];
    loadingDays?: ((date: Date) => boolean) | Date[];
    shouldShowYearPicker?: boolean;
    shouldShowMonthSelector?: boolean;
    shouldShowRelativeRanges?: boolean;
    isFutureDatesAllowed?: boolean;
    modifiers?: Record<string, any>;
    ranges?: RangeKey[];
    components?: {
        Footer?: React.ComponentType;
    };
    locale?: string;
    timezoneName?: string;
    getDayContent?: (day: number, date: Date) => React.ReactNode;
    getTooltip?: (date: Date) => React.ReactNode;
    onChange: (value: any, options?: any, event?: any) => void;
    onMonthChange?: (month: Date) => void;
    onSubmitDateRange?: () => void;
}

/**
 * Figma Design link: https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%F0%9F%9B%A0-Xola-DS-Desktop-Master-%F0%9F%9B%A0?node-id=2689%3A101580
 */
export const DatePicker = ({
    variant = variants.single,
    value,
    selectedDays,
    upcomingDates,
    disabledDays = [],
    loadingDays = [],
    shouldShowYearPicker = false,
    shouldShowMonthSelector = false,
    shouldShowRelativeRanges = false,
    isFutureDatesAllowed = false,
    modifiers = {},
    ranges,
    components = {},
    locale,
    timezoneName,
    getDayContent,
    getTooltip,
    onChange,
    onMonthChange,
    onSubmitDateRange,
    ...rest
}: DatePickerProps) => {
    const { locale: contextLocale } = useContext(Context);
    const tz = timezoneName ?? undefined;
    const initialValue = value ? (variant === variants.single ? value : (value as any).from) : null;
    const [currentMonth, setCurrentMonth] = useState(initialValue ?? now(undefined, tz).toDate());
    const [startMonth, setStartMonth] = useState(() => {
        if (!value || typeof value !== "object" || !("from" in value) || !value.from) {
            return new Date();
        }

        return value.from;
    });
    const [endMonth, setEndMonth] = useState(() => {
        if (!value || typeof value !== "object" || !("from" in value) || !("to" in value) || !value.to || !value.from) {
            return now(undefined, tz).add(1, "month").toDate();
        }

        return isSame(now(value.to, tz), now(value.from, tz), "month")
            ? now(value.from, tz).add(1, "month").toDate()
            : value.to;
    });
    const [rangeName, setRangeName] = useState("");
    const isRangeVariant = variant === variants.range;
    const isValidValue =
        value && typeof value === "object" && "from" in value && "to" in value && value.from && value.to;
    const isSelectedDaysHasValidRange =
        selectedDays &&
        typeof selectedDays === "object" &&
        "from" in selectedDays &&
        "to" in selectedDays &&
        selectedDays.from &&
        selectedDays.to;

    useEffect(() => {
        if (timezoneName && !isValidTimeZoneName(timezoneName)) {
            console.log(`${timezoneName} is not a valid timezone. Using default timezone now`);
            dayjs.tz.setDefault();
        }
    }, [timezoneName]);

    const handleTodayClick = (day: Date, options: any, event: any) => {
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

    const isDisabled = (date: Date): boolean => {
        if (isArray(disabledDays)) {
            return disabledDays.some((_date) => isSame(now(_date, tz), date, "day"));
        }

        if (isFunction(disabledDays)) {
            return (disabledDays as (date: Date) => boolean)(date);
        }

        return false;
    };

    const isLoading = (date: Date): boolean => {
        if (isArray(loadingDays)) {
            return loadingDays.some((_date) => isSame(now(_date, tz), date, "day"));
        }

        if (isFunction(loadingDays)) {
            return (loadingDays as (date: Date) => boolean)(date);
        }

        return false;
    };

    const handleRelativeRangeChanged = (rangeName: string, range: { from: Date; to: Date }) => {
        setCurrentMonth(range.from);
        setStartMonth(range.from);
        setEndMonth(range.to);
        onChange({ ...range, rangeName }, modifiers, null);
    };

    const handleMonthChange = (m: Date) => {
        setCurrentMonth(m);
        onMonthChange?.(m);
    };

    const handleStartMonthChange = (m: Date) => {
        setStartMonth(m);
        onMonthChange?.(m);
    };

    const handleEndMonthChange = (m: Date) => {
        setEndMonth(m);
        onMonthChange?.(m);
    };

    const handleDayClick = (day: Date, options: any, event: any) => {
        if (options.disabled) {
            return;
        }

        if (
            value &&
            typeof value === "object" &&
            "from" in value &&
            value.from &&
            isSame(now(value.from, tz), now(day, tz), "month")
        ) {
            handleStartMonthChange(day);
        }

        setRangeName("");
        if (isRangeVariant) {
            const rangeValue = value as any;
            if (isValidValue) {
                // This allows us to easily select another date range,
                // if both dates are selected.
                onChange({ from: toDate(now(day, tz)), to: null }, options, event);
            } else if (
                rangeValue &&
                (rangeValue.from || rangeValue.to) &&
                (rangeValue.from || rangeValue.to).getTime() === day.getTime()
            ) {
                const from = toDate(now(day, tz));
                const to = toDate(now(day, tz).endOf("day"), false);

                onChange({ from, to }, options, event);
            } else if (rangeValue.from && DateUtils.isDayBefore(rangeValue.from, toDate(now(day, tz)))) {
                // this works if the user first clicked on the date that will go to "from", and the second click to "to"
                onChange(DateUtils.addDayToRange(toDate(now(day, tz), false), rangeValue), options, event);
            } else if (
                rangeValue.from &&
                (DateUtils.isDayAfter(rangeValue.from, toDate(now(day, tz))) ||
                    DateUtils.isSameDay(rangeValue.from, toDate(now(day, tz))))
            ) {
                // this works if the user first clicked on the date that will go to "to", and the second click to "from"
                // also this works when the user has selected one date
                onChange(
                    {
                        from: toDate(now(day, tz)),
                        to: toDate(now(rangeValue.from).endOf("day"), false),
                    },
                    options,
                    event,
                );
            } else {
                // Fallback when rangeValue.from is null
                onChange(DateUtils.addDayToRange(toDate(now(day, tz).endOf("day"), false), rangeValue), options, event);
            }
        } else {
            onChange(toDate(now(day, tz)), options, event);
        }
    };

    // TODO: Should be outside this component because this returns JSX
    const CaptionElement = useMemo(() => {
        return (shouldShowYearPicker || shouldShowMonthSelector) && currentMonth
            ? ({ date }: { date: Date }) =>
                  shouldShowMonthSelector ? (
                      <MonthSelector
                          date={date}
                          currentMonth={currentMonth}
                          locale={locale ?? contextLocale}
                          onChange={handleMonthChange}
                      />
                  ) : (
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
    }, [shouldShowYearPicker, shouldShowMonthSelector, currentMonth]);

    // TODO: Should be outside this component because this returns JSX
    const renderDay = (date: Date) => {
        const tooltipContent = getTooltip?.(date);
        const disabled = isDisabled(date);
        const loading = isLoading(date);

        return tooltipContent ? (
            <Tooltip placement="top" content={tooltipContent}>
                <Day
                    disabled={disabled}
                    isLoading={loading}
                    selectedDate={value}
                    date={date}
                    getContent={getDayContent}
                    currentMonth={currentMonth}
                />
            </Tooltip>
        ) : (
            <Day
                disabled={disabled}
                isLoading={loading}
                selectedDate={value}
                date={date}
                getContent={getDayContent}
                currentMonth={currentMonth}
            />
        );
    };

    const rangeModifier =
        isRangeVariant && isValidValue
            ? { start: (value as any).from, end: (value as any).to }
            : isSelectedDaysHasValidRange
            ? { start: (selectedDays as any).from, end: (selectedDays as any).to }
            : null;

    // Comparing `from` and `to` dates hides a weird CSS style when you select the same date twice in a date range.
    const useDateRangeStyle =
        isRangeVariant && isValidValue && (value as any).from?.getTime() !== (value as any).to?.getTime();
    const useDateSelectedRangeStyle =
        isSelectedDaysHasValidRange && (selectedDays as any).from?.getTime() !== (selectedDays as any).to?.getTime();
    // Return the same value if it is already dayjs object or has range variant otherwise format it to dayJs object
    const selectedDaysValues =
        selectedDays ?? (value && (dayjs.isDayjs(value) || isRangeVariant ? value : now(value as Date, tz).toDate()));

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
                        value={value as any}
                        handleDayClick={handleDayClick}
                        handleStartMonthChange={handleStartMonthChange}
                        handleEndMonthChange={handleEndMonthChange}
                        handleTodayClick={handleTodayClick}
                        selectedDays={selectedDaysValues as any}
                        locale={locale ?? contextLocale}
                        timezoneName={tz}
                        {...rest}
                    />
                ) : (
                    <LocalizedDayPicker
                        className={clsx(
                            "ui-date-picker rounded-lg pt-3",
                            useDateRangeStyle ? "date-range-picker" : null,
                            useDateSelectedRangeStyle ? "date-range-picker max-w-[400px]" : null,
                            getDayContent ? "has-custom-content" : null,
                            modifiers.waitlist ? "has-custom-content" : null,
                        )}
                        todayButton="Today"
                        selectedDays={selectedDaysValues as any}
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
                            timezoneName={tz}
                            isFutureDatesAllowed={isFutureDatesAllowed}
                            onChange={handleRelativeRangeChanged}
                            onSubmit={onSubmitDateRange}
                        />
                    </div>
                </div>
            )}
        </>
    );
};
