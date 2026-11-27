import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { useContext, useEffect, useMemo } from "react";
import { warnRemovedProps } from "../../helpers/warnRemovedProps";
import { isSame, isValidTimeZoneName, now, toDate } from "../../utils/date";
import { Context } from "../Provider";
import "./DatePicker.css";
import {
    createDayMatcher,
    getDayPickerClassName,
    getModifiersClassNames,
    getNextRange,
    getSelectedValue,
    getSelectionMode,
    hasDistinctRange,
    variants,
} from "./DatePicker.helpers";
import { PickerDayContext } from "./dayPickerComponents";
import { RangeDatePicker } from "./RangeDatePicker";
import { RelativeDateRange } from "./RelativeDateRange";
import { SingleDatePicker } from "./SingleDatePicker";
import { UpcomingDatePicker } from "./UpcomingDatePicker";
import { useDatePickerMonths } from "./useDatePickerMonths";

const NO_DAYS = [];
const NO_MODIFIERS = {};
const NO_COMPONENTS = {};

export const DATE_PICKER_REMOVED_PROPS = {
    toMonth: "use 'endMonth'",
    month: "use 'defaultMonth'",
    fromMonth: "use 'startMonth'",
    selectedDays: "use 'selected'",
    disabledDays: "use 'disabled'",
};

/**
 * Figma Design link: https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%F0%9F%9B%A0-Xola-DS-Desktop-Master-%F0%9F%9B%A0?node-id=2689%3A101580
 */
export const DatePicker = ({
    shouldShowYearPicker = false,
    shouldShowMonthSelector = false,
    shouldShowRelativeRanges = false,
    isFutureDatesAllowed = false,
    variant = variants.single,
    disabled = NO_DAYS,
    loadingDays = NO_DAYS,
    todayButton = "Today",
    modifiers = NO_MODIFIERS,
    components = NO_COMPONENTS,
    timezoneName = null, // seller timezone (e.g. "America/Los_Angeles") to return correct today date
    value,
    selected,
    defaultMonth,
    modifiersClassNames,
    upcomingDates,
    locale,
    getDayContent,
    onChange,
    onMonthChange,
    onSubmitDateRange,
    getTooltip,
    ...rest
}) => {
    warnRemovedProps("DatePicker", rest, DATE_PICKER_REMOVED_PROPS);

    const { Footer } = components;
    const { locale: contextLocale } = useContext(Context);
    const months = useDatePickerMonths({ value, variant, defaultMonth, timezoneName, onMonthChange });
    const { currentMonth, leftMonth, rightMonth, showRange } = months;
    const { handleMonthChange, handleLeftMonthChange, handleRightMonthChange } = months;

    useEffect(() => {
        if (timezoneName && !isValidTimeZoneName(timezoneName)) {
            console.log(`${timezoneName} is not a valid timezone. Using default timezone now`);
            dayjs.tz.setDefault();
        }
    }, [timezoneName]);

    const isDayDisabled = useMemo(() => createDayMatcher(disabled, timezoneName), [disabled, timezoneName]);
    const isLoading = useMemo(() => createDayMatcher(loadingDays, timezoneName), [loadingDays, timezoneName]);
    const dayContext = useMemo(
        () => ({ value, getTooltip, isLoading, getContent: getDayContent }),
        [value, getTooltip, isLoading, getDayContent],
    );

    const resolvedLocale = locale ?? contextLocale;
    const isRangeVariant = variant === variants.range;

    const handleTodayClick = (event) => {
        const today = timezoneName ? toDate(now(new Date(), timezoneName)) : new Date();
        handleMonthChange(today);

        if (isDayDisabled(today)) {
            return;
        }

        onChange(today, { today: true }, event);
    };

    const handleRelativeRangeChange = (rangeName, range) => {
        showRange(range);
        onChange({ ...range, rangeName }, modifiers, null);
    };

    const handleDayClick = (day, options, event) => {
        const isInStartMonth = isSame(now(value?.from, timezoneName), now(day, timezoneName), "month");
        if (isInStartMonth) {
            handleLeftMonthChange(day);
        }

        const nextValue = isRangeVariant ? getNextRange(day, value, timezoneName) : toDate(now(day, timezoneName));
        onChange(nextValue, options, event);
    };

    const selectedValue = getSelectedValue(selected, value, isRangeVariant, timezoneName);
    // Comparing `from` and `to` dates hides a weird CSS style when you select the same date twice in a date range.
    const className = getDayPickerClassName({
        withMaxWidth: isRangeVariant,
        isDateRangeStyle: isRangeVariant && hasDistinctRange(value),
        hasCustomContent: Boolean(getDayContent || modifiers.waitlist),
        isDateSelectedRangeStyle: !isRangeVariant && hasDistinctRange(selected),
    });
    const dayPickerProps = {
        className,
        modifiers,
        selected: selectedValue,
        mode: isRangeVariant ? variants.range : getSelectionMode(selectedValue),
        modifiersClassNames: { ...getModifiersClassNames(modifiers), ...modifiersClassNames },
        ...rest,
    };

    return (
        <>
            <div className="flex">
                {upcomingDates && (
                    <UpcomingDatePicker
                        upcomingDates={upcomingDates}
                        value={value}
                        onChange={handleDayClick}
                        onMonthChange={handleMonthChange}
                    />
                )}

                <PickerDayContext.Provider value={dayContext}>
                    {isRangeVariant ? (
                        <RangeDatePicker
                            shouldShowYearPicker={shouldShowYearPicker}
                            leftMonth={leftMonth}
                            rightMonth={rightMonth}
                            value={value}
                            locale={resolvedLocale}
                            timezoneName={timezoneName}
                            dayPickerProps={dayPickerProps}
                            isDayDisabled={isDayDisabled}
                            onDayClick={handleDayClick}
                            onLeftMonthChange={handleLeftMonthChange}
                            onRightMonthChange={handleRightMonthChange}
                        />
                    ) : (
                        <SingleDatePicker
                            shouldShowYearPicker={shouldShowYearPicker}
                            shouldShowMonthSelector={shouldShowMonthSelector}
                            month={currentMonth}
                            todayButton={todayButton}
                            locale={resolvedLocale}
                            dayPickerProps={dayPickerProps}
                            isDayDisabled={isDayDisabled}
                            onDayClick={handleDayClick}
                            onMonthChange={handleMonthChange}
                            onTodayClick={handleTodayClick}
                        />
                    )}
                </PickerDayContext.Provider>
            </div>

            {Footer && <Footer />}

            {shouldShowRelativeRanges && (
                <div className="max-w-200">
                    <div className="ml-auto w-5/12">
                        <RelativeDateRange
                            isFutureDatesAllowed={isFutureDatesAllowed}
                            value=""
                            timezoneName={timezoneName}
                            onChange={handleRelativeRangeChange}
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
    selected: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.object]),
    upcomingDates: PropTypes.arrayOf(Date),
    onChange: PropTypes.func.isRequired,
    onMonthChange: PropTypes.func,
    onSubmitDateRange: PropTypes.func,
    disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.object, PropTypes.array, PropTypes.func]),
    loadingDays: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.instanceOf(Date)), PropTypes.func]),
    shouldShowYearPicker: PropTypes.bool,
    shouldShowMonthSelector: PropTypes.bool,
    isFutureDatesAllowed: PropTypes.bool,
    getDayContent: PropTypes.func,
    modifiers: PropTypes.object,
    modifiersClassNames: PropTypes.objectOf(PropTypes.string),
    todayButton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    defaultMonth: PropTypes.instanceOf(Date),
    shouldShowRelativeRanges: PropTypes.bool,
    components: PropTypes.shape({ Footer: PropTypes.oneOfType([PropTypes.node, PropTypes.func]) }),
    getTooltip: PropTypes.func,
    locale: PropTypes.string,
    timezoneName: PropTypes.string,
};
