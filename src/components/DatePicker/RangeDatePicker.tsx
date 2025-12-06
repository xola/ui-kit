import clsx from "clsx";
import { isArray, isFunction } from "lodash";
import React from "react";
import { now } from "../../helpers/date";
import { Tooltip } from "../Tooltip";
import { Day } from "./Day";
import { LocalizedDayPicker } from "./LocalizedDayPicker";
import { MonthYearSelector } from "./MonthYearSelector";
import { NavbarElement } from "./NavbarElement";

interface DateRange {
    from?: Date;
    to?: Date;
}

export interface RangeDatePickerProps {
    value?: DateRange;
    selectedDays?: DateRange;
    startMonth: Date;
    endMonth: Date;
    isDateRangeStyle?: boolean;
    shouldShowYearPicker?: boolean;
    disabledDays?: ((date: Date) => boolean) | Date[];
    modifiers?: Record<string, any>;
    locale?: string;
    timezoneName?: string;
    getDayContent?: (day: number, date: Date) => React.ReactNode;
    getTooltip?: (date: Date) => React.ReactNode;
    handleDayClick: (day: Date, options: Record<string, any>, event: React.MouseEvent, isStart?: boolean) => void;
    handleStartMonthChange: (month: Date) => void;
    handleEndMonthChange: (month: Date) => void;
    handleTodayClick: (day: Date, options: Record<string, any>, event: React.MouseEvent) => void;
}

const RangeDatePicker = ({
    value,
    selectedDays,
    startMonth,
    endMonth,
    isDateRangeStyle,
    shouldShowYearPicker,
    disabledDays,
    modifiers = {},
    locale,
    timezoneName,
    getDayContent,
    getTooltip,
    handleDayClick,
    handleStartMonthChange,
    handleEndMonthChange,
    handleTodayClick,
    ...rest
}: RangeDatePickerProps) => {
    const isStartDateIsTheSameMonth = now(value?.from, timezoneName).isSame(now(value?.to, timezoneName), "month");
    const isSingleDayDateRange = now(value?.from, timezoneName).isSame(now(value?.to, timezoneName), "day");

    const createCaptionElement = (currentMonth: Date, handleChange: (month: Date) => void) =>
        shouldShowYearPicker && currentMonth
            ? ({ date }: { date: Date }) => (
                  <MonthYearSelector date={date} currentMonth={currentMonth} locale={locale} onChange={handleChange} />
              )
            : undefined;

    const CaptionStartElement = createCaptionElement(startMonth, handleStartMonthChange);
    const CaptionEndElement = createCaptionElement(endMonth, handleEndMonthChange);

    const isDateDisabledFromOutside = (date: Date) => {
        if (isFunction(disabledDays)) {
            return disabledDays(date);
        }

        if (isArray(disabledDays)) {
            return disabledDays.some((_date) => now(_date, timezoneName).isSame(date, "day"));
        }

        return false;
    };

    const isDisabledStartDays = (date: Date) => {
        return isDateDisabledFromOutside(date);
    };

    const isDisabledEndDays = (date: Date) => {
        const isDateBeforeStartDate = now(date, timezoneName).isBefore(value?.from, "day");

        return isDateDisabledFromOutside(date) || (isDateBeforeStartDate && !isSingleDayDateRange);
    };

    const renderDay = (date: Date, isDisabledDays: (date: Date) => boolean, currentMonth: Date) => {
        const tooltipContent = getTooltip?.(date);
        const disabled = isDisabledDays(date);

        const dayElement = (
            <Day
                disabled={disabled}
                selectedDate={value}
                date={date}
                getContent={getDayContent}
                currentMonth={currentMonth}
            />
        );

        return tooltipContent ? (
            <Tooltip placement="top" content={tooltipContent}>
                {dayElement}
            </Tooltip>
        ) : (
            dayElement
        );
    };

    const renderStartDay = (date: Date) => {
        return renderDay(date, isDisabledStartDays, startMonth);
    };

    const renderEndDay = (date: Date) => {
        return renderDay(date, isDisabledEndDays, endMonth);
    };

    return (
        <div className="flex gap-4">
            <LocalizedDayPicker
                className={clsx(
                    "ui-date-picker max-w-[400px] rounded-lg pt-3",
                    isDateRangeStyle ? "date-range-picker" : null,
                    getDayContent ? "has-custom-content" : null,
                    modifiers.waitlist ? "has-custom-content" : null,
                )}
                month={startMonth}
                modifiers={{ ...modifiers, start: value?.from }}
                disabledDays={isDisabledStartDays}
                navbarElement={NavbarElement}
                captionElement={CaptionStartElement}
                selectedDays={[selectedDays?.from, selectedDays] as any}
                renderDay={renderStartDay}
                onDayClick={(day, options, event) => handleDayClick(day, options, event, true)}
                onMonthChange={handleStartMonthChange}
                onTodayButtonClick={handleTodayClick}
                {...rest}
            />
            <LocalizedDayPicker
                className={clsx(
                    "ui-date-picker max-w-[400px] rounded-lg pt-3",
                    isDateRangeStyle ? "date-range-picker" : null,
                    getDayContent ? "has-custom-content" : null,
                    modifiers.waitlist ? "has-custom-content" : null,
                )}
                month={endMonth}
                modifiers={isStartDateIsTheSameMonth ? {} : { ...modifiers, end: value?.to }}
                disabledDays={isDisabledEndDays}
                navbarElement={NavbarElement}
                captionElement={CaptionEndElement}
                selectedDays={(isStartDateIsTheSameMonth ? [] : selectedDays) as any}
                renderDay={renderEndDay}
                onDayClick={(day, options, event) => handleDayClick(day, options, event, false)}
                onMonthChange={handleEndMonthChange}
                onTodayButtonClick={handleTodayClick}
                {...rest}
            />
        </div>
    );
};

export default RangeDatePicker;
