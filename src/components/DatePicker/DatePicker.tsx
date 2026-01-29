import dayjs from "dayjs";
import { isArray, isFunction } from "lodash-es";
import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { isBefore, isAfter, isSameDay, startOfDay, endOfDay } from "date-fns";
import { Tooltip } from "../..";
import { isSame, isValidTimeZoneName, now, toDate } from "../../helpers/date";
import cn from "../../helpers/classnames";
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
    month: externalMonth,
    // Deprecated v7 props are spread into rest and ignored
    ...rest
}: DatePickerProps) => {
    const { locale: contextLocale } = useContext(Context);
    const tz = timezoneName ?? undefined;
    const initialValue = value ? (variant === variants.single ? value : (value as any).from) : null;
    const [currentMonth, setCurrentMonth] = useState(externalMonth ?? initialValue ?? now(undefined, tz).toDate());
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
            return disabledDays.some((matcher: any) => {
                // Handle v7 syntax: { daysOfWeek: [0, 6] }
                if (matcher.daysOfWeek) {
                    return matcher.daysOfWeek.includes(date.getDay());
                }
                // Handle v7 syntax: { after: Date, before: Date }
                if (matcher.after || matcher.before) {
                    const afterMatch = matcher.after ? isAfter(startOfDay(date), startOfDay(matcher.after)) : true;
                    const beforeMatch = matcher.before ? isBefore(startOfDay(date), startOfDay(matcher.before)) : true;
                    return afterMatch && beforeMatch;
                }
                // Handle simple Date
                if (matcher instanceof Date) {
                    return isSame(now(matcher, tz), date, "day");
                }
                return false;
            });
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

    const handleMonthChange = useCallback(
        (m: Date) => {
            setCurrentMonth(m);
            onMonthChange?.(m);
        },
        [onMonthChange],
    );

    const handleStartMonthChange = useCallback(
        (m: Date) => {
            setStartMonth(m);
            onMonthChange?.(m);
        },
        [onMonthChange],
    );

    const handleEndMonthChange = useCallback(
        (m: Date) => {
            setEndMonth(m);
            onMonthChange?.(m);
        },
        [onMonthChange],
    );

    const handleDayClick = useCallback(
        (day: Date | undefined, options: any, event: any) => {
            if (!day || options.disabled) {
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
                } else if (rangeValue.from && isBefore(startOfDay(rangeValue.from), startOfDay(toDate(now(day, tz))))) {
                    // this works if the user first clicked on the date that will go to "from", and the second click to "to"
                    const from = rangeValue.from;
                    const to = endOfDay(toDate(now(day, tz), false));
                    onChange({ from, to }, options, event);
                } else if (
                    rangeValue.from &&
                    (isAfter(startOfDay(rangeValue.from), startOfDay(toDate(now(day, tz)))) ||
                        isSameDay(rangeValue.from, toDate(now(day, tz))))
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
                    const to = endOfDay(toDate(now(day, tz), false));
                    onChange({ from: rangeValue.from, to }, options, event);
                }
            } else {
                onChange(toDate(now(day, tz)), options, event);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [isRangeVariant, isValidValue, onChange, tz, value],
    );

    // TODO: Should be outside this component because this returns JSX
    const CaptionElement = useMemo(() => {
        return (shouldShowYearPicker || shouldShowMonthSelector) && currentMonth
            ? (props: any) =>
                  shouldShowMonthSelector ? (
                      <MonthSelector
                          date={props.date || currentMonth}
                          currentMonth={currentMonth}
                          locale={locale ?? contextLocale}
                          onChange={handleMonthChange}
                      />
                  ) : (
                      <MonthYearSelector
                          date={props.date || currentMonth}
                          currentMonth={currentMonth}
                          locale={locale ?? contextLocale}
                          onChange={handleMonthChange}
                      />
                  )
            : undefined;
    }, [shouldShowYearPicker, shouldShowMonthSelector, currentMonth, handleMonthChange, locale, contextLocale]);

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
                        className={cn("pt-6 tracking-tightest rounded-lg ring-0 focus:outline-none focus:ring-0")}
                        mode="single"
                        selected={value as Date}
                        month={currentMonth}
                        modifiers={{ ...modifiers, ...rangeModifier }}
                        disabled={isDisabled}
                        onSelect={handleDayClick}
                        onMonthChange={handleMonthChange}
                        classNames={{
                            months: "flex flex-col relative",
                            month_caption: "relative flex h-8 mb-4 pl-4",
                            caption_label: "text-lg font-semibold",
                            nav: "h-8 right-4 absolute items-center",
                            weekdays: "flex flex-row",
                            weekday: "w-full m-0 p-0 text-base font-semibold text-black",
                            month: "w-full min-w-[400px]",
                            month_grid: "w-full mt-4",
                            week: "mt-0.5 flex w-full justify-between",
                            day: "w-[calc(100%/7)] mr-0.5 rounded",
                            day_button:
                                "h-12 w-full cursor-pointer rounded bg-transparent hover:border hover:border-blue hover:bg-blue-lighter hover:text-black disabled:cursor-not-allowed disabled:text-gray-light disabled:hover:border-none disabled:hover:bg-transparent",
                            selected:
                                "[&>button]:border [&>button]:border-blue [&>button]:bg-blue [&>button]:text-white [&>button:hover]:border-blue-darker [&>button:hover]:bg-blue-darker",
                            today: "[&>button]:border [&>button]:border-gray-light",
                            outside: "opacity-0",
                            disabled: "text-gray-light cursor-not-allowed [&>button]:cursor-not-allowed",
                            hidden: "invisible",
                        }}
                        modifiersClassNames={{
                            waitlist:
                                "[&>button]:relative [&>button]:after:content-[''] [&>button]:after:absolute [&>button]:after:bottom-1 [&>button]:after:left-1/2 [&>button]:after:-translate-x-1/2 [&>button]:after:h-2 [&>button]:after:w-2 [&>button]:after:rounded-full [&>button]:after:bg-yellow",
                        }}
                        components={{
                            ...(CaptionElement ? { CaptionLabel: CaptionElement } : {}),
                            DayButton: ({ day, ...buttonProps }) => {
                                return <button {...buttonProps}>{renderDay(day.date)}</button>;
                            },
                            Nav: (props) => (
                                <NavbarElement {...props} onTodayClick={(e) => handleTodayClick(new Date(), {}, e)} />
                            ),
                        }}
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
