import dayjs from "dayjs";
import { useMemoizedFn } from "ahooks";
import PropTypes from "prop-types";
import React, { useContext, useEffect, useMemo, useState } from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import { Tooltip } from "../..";
import { isSame, isValidTimeZoneName, now, toDate } from "../../utils/date";
import { Context } from "../Provider";
import { createCaptionElement } from "./CaptionElement";
import "./DatePicker.css";
import {
    createDayMatcher,
    getDayPickerClassName,
    getInitialCurrentMonth,
    getInitialEndMonth,
    getInitialStartMonth,
    getRangeModifier,
    getSelectedDaysValues,
    hasDistinctRange,
    hasRange,
    variants,
} from "./DatePicker.helpers";
import { Day } from "./Day";
import { LocalizedDayPicker } from "./LocalizedDayPicker";
import { NavbarElement } from "./NavbarElement";
import RangeDatePicker from "./RangeDatePicker";
import { RelativeDateRange } from "./RelativeDateRange";
import { UpcomingDatePicker } from "./UpcomingDatePicker";

// react-day-picker v7 is CJS-only, so a named import breaks every Node ESM consumer.
const { DateUtils } = DayPicker;

/**
 * Figma Design link: https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%F0%9F%9B%A0-Xola-DS-Desktop-Master-%F0%9F%9B%A0?node-id=2689%3A101580
 */
export const DatePicker = ({
    variant = variants.single,
    value,
    getDayContent,
    disabledDays = [],
    selectedDays,
    loadingDays = [],
    shouldShowYearPicker = false,
    shouldShowMonthSelector = false,
    onChange,
    onMonthChange,
    onSubmitDateRange,
    modifiers = {},
    shouldShowRelativeRanges = false,
    isFutureDatesAllowed = false,
    components = {},
    getTooltip,
    upcomingDates,
    locale,
    timezoneName = null, // seller timezone (e.g. "America/Los_Angeles") to return correct today date
    ...rest
}) => {
    const { locale: contextLocale } = useContext(Context);
    const [currentMonth, setCurrentMonth] = useState(() => getInitialCurrentMonth(value, variant, timezoneName));
    const [startMonth, setStartMonth] = useState(() => getInitialStartMonth(value));
    const [endMonth, setEndMonth] = useState(() => getInitialEndMonth(value, timezoneName));
    const [rangeName, setRangeName] = useState("");
    const isRangeVariant = variant === variants.range;
    const isValidValue = hasRange(value);

    useEffect(() => {
        if (timezoneName && !isValidTimeZoneName(timezoneName)) {
            console.log(`${timezoneName} is not a valid timezone. Using default timezone now`);
            dayjs.tz.setDefault();
        }
    }, [timezoneName]);

    const isDisabled = useMemo(() => createDayMatcher(disabledDays, timezoneName), [disabledDays, timezoneName]);

    const isLoading = useMemo(() => createDayMatcher(loadingDays, timezoneName), [loadingDays, timezoneName]);

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

    const handleRelativeRangeChanged = (rangeName, range) => {
        setCurrentMonth(range.from);
        setStartMonth(range.from);
        setEndMonth(range.to);
        onChange({ ...range, rangeName }, modifiers, null);
    };

    const handleMonthChange = useMemoizedFn((m) => {
        setCurrentMonth(m);
        onMonthChange?.(m);
    });

    const handleStartMonthChange = useMemoizedFn((m) => {
        setStartMonth(m);
        onMonthChange?.(m);
    });

    const handleEndMonthChange = useMemoizedFn((m) => {
        setEndMonth(m);
        onMonthChange?.(m);
    });

    const handleRangeDayClick = (day, options, event) => {
        const clicked = now(day, timezoneName);
        const clickedStart = toDate(clicked);
        const clickedEnd = toDate(clicked, false);

        if (isValidValue) {
            // This allows us to easily select another date range,
            // if both dates are selected.
            onChange({ from: clickedStart, to: null }, options, event);
            return;
        }

        const selected = value?.from ?? value?.to;
        if (selected && selected.getTime() === day.getTime()) {
            onChange({ from: clickedStart, to: clickedEnd }, options, event);
            return;
        }

        if (value.from && DateUtils.isDayBefore(value.from, clickedStart)) {
            // this works if the user first clicked on the date that will go to "from", and the second click to "to"
            onChange(DateUtils.addDayToRange(clickedEnd, value), options, event);
            return;
        }

        if (
            value.from &&
            (DateUtils.isDayAfter(value.from, clickedStart) || DateUtils.isSameDay(value.from, clickedStart))
        ) {
            // this works if the user first clicked on the date that will go to "to", and the second click to "from"
            // also this works when the user has selected one date
            onChange({ from: clickedStart, to: toDate(now(value.from, timezoneName), false) }, options, event);
            return;
        }

        onChange(DateUtils.addDayToRange(clickedEnd, value), options, event);
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
            handleRangeDayClick(day, options, event);
        } else {
            onChange(toDate(now(day, timezoneName)), options, event);
        }
    };

    const resolvedLocale = locale ?? contextLocale;
    const CaptionElement = useMemo(
        () =>
            createCaptionElement({
                shouldShowYearPicker,
                shouldShowMonthSelector,
                currentMonth,
                locale: resolvedLocale,
                onChange: handleMonthChange,
            }),
        [shouldShowYearPicker, shouldShowMonthSelector, currentMonth, handleMonthChange, resolvedLocale],
    );

    // TODO: Should be outside this component because this returns JSX
    const renderDay = (date) => {
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

    const rangeModifier = getRangeModifier(isRangeVariant, value, selectedDays);

    // Comparing `from` and `to` dates hides a weird CSS style when you select the same date twice in a date range.
    const useDateRangeStyle = isRangeVariant && hasDistinctRange(value);
    const useDateSelectedRangeStyle = hasDistinctRange(selectedDays);
    const selectedDaysValues = getSelectedDaysValues(selectedDays, value, isRangeVariant, timezoneName);

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
                        selectedDays={selectedDaysValues}
                        locale={resolvedLocale}
                        timezoneName={timezoneName}
                        {...rest}
                    />
                ) : (
                    <LocalizedDayPicker
                        className={getDayPickerClassName({
                            isDateRangeStyle: useDateRangeStyle,
                            isDateSelectedRangeStyle: useDateSelectedRangeStyle,
                            hasCustomContent: Boolean(getDayContent || modifiers.waitlist),
                        })}
                        todayButton="Today"
                        selectedDays={selectedDaysValues}
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
                            timezoneName={timezoneName}
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

DatePicker.propTypes = {
    variant: PropTypes.oneOf(Object.keys(variants)),
    value: PropTypes.objectOf(Date),
    selectedDays: PropTypes.objectOf(Date),
    upcomingDates: PropTypes.arrayOf(Date),
    onChange: PropTypes.func.isRequired,
    onMonthChange: PropTypes.func,
    onSubmitDateRange: PropTypes.func,
    disabledDays: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
    loadingDays: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.instanceOf(Date)), PropTypes.func]),
    shouldShowYearPicker: PropTypes.bool,
    shouldShowMonthSelector: PropTypes.bool,
    isFutureDatesAllowed: PropTypes.bool,
    getDayContent: PropTypes.func,
    modifiers: PropTypes.object,
    shouldShowRelativeRanges: PropTypes.bool,
    components: PropTypes.shape({ Footer: PropTypes.oneOfType([PropTypes.node, PropTypes.func]) }),
    getTooltip: PropTypes.func,
    locale: PropTypes.string,
    timezoneName: PropTypes.string,
};
