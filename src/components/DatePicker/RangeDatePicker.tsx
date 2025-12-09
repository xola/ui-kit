import clsx from "clsx";
import { isArray, isFunction } from "lodash-es";
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
    handleDayClick: (
        day: Date | undefined,
        options: Record<string, any>,
        event: React.MouseEvent | React.KeyboardEvent,
        isStart?: boolean,
    ) => void;
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
            ? (props: any) => (
                  <MonthYearSelector
                      date={props.date || currentMonth}
                      currentMonth={currentMonth}
                      locale={locale}
                      onChange={handleChange}
                  />
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

    const datePickerClassNames = {
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
        day_button: "h-12 w-full cursor-pointer rounded bg-transparent hover:border hover:border-blue hover:bg-blue-lighter hover:text-black disabled:cursor-not-allowed disabled:text-gray-light disabled:hover:border-none disabled:hover:bg-transparent",
        selected: clsx(
            isDateRangeStyle
                ? "[&>button]:bg-transparent [&>button]:text-black [&>button:hover]:bg-blue-lighter [&>button:hover]:text-black"
                : "[&>button]:border [&>button]:border-blue [&>button]:bg-blue [&>button]:text-white [&>button:hover]:border-blue-darker [&>button:hover]:bg-blue-darker",
        ),
        today: "[&>button]:border [&>button]:border-gray-light",
        outside: "opacity-0",
        disabled: "text-gray-light cursor-not-allowed [&>button]:cursor-not-allowed",
        hidden: "invisible",
    };

    const datePickerModifiersClassNames = {
        start: clsx(
            isDateRangeStyle && !isSingleDayDateRange
                ? "rounded-none [background:linear-gradient(90deg,#ffffff_40%,#d1e1ff_25%)] [&>button]:!bg-blue [&>button]:!text-white [&>button]:rounded-full"
                : "[&>button]:!bg-blue [&>button]:!text-white",
            isSingleDayDateRange ? "[&>button]:outline [&>button]:outline-offset-1 [&>button]:outline-blue-lighter" : null,
        ),
        end: clsx(
            isDateRangeStyle && !isSingleDayDateRange
                ? "rounded-none [background:linear-gradient(90deg,#d1e1ff_40%,#ffffff_25%)] [&>button]:!bg-blue [&>button]:!text-white [&>button]:rounded-full"
                : "[&>button]:!bg-blue [&>button]:!text-white",
            isSingleDayDateRange ? "[&>button]:outline [&>button]:outline-offset-1 [&>button]:outline-blue-lighter" : null,
        ),
        selected: isDateRangeStyle ? "rounded-none bg-blue-lighter text-black" : "",
        waitlist:
            "[&>button]:relative [&>button]:after:content-[''] [&>button]:after:absolute [&>button]:after:bottom-1 [&>button]:after:left-1/2 [&>button]:after:-translate-x-1/2 [&>button]:after:h-2 [&>button]:after:w-2 [&>button]:after:rounded-full [&>button]:after:bg-yellow",
    };

    return (
        <div className="flex gap-4">
            <LocalizedDayPicker
                className={clsx("pt-6 tracking-tightest max-w-[400px] rounded-lg ring-0 focus:outline-none focus:ring-0")}
                mode="single"
                selected={selectedDays?.from}
                month={startMonth}
                modifiers={{ ...modifiers, start: value?.from }}
                disabled={isDisabledStartDays}
                onSelect={(
                    day: Date | undefined,
                    _selectedDay: Date | undefined,
                    activeModifiers: any,
                    e: React.MouseEvent | React.KeyboardEvent,
                ) => handleDayClick(day, activeModifiers, e, true)}
                onMonthChange={handleStartMonthChange}
                classNames={datePickerClassNames}
                modifiersClassNames={datePickerModifiersClassNames}
                components={{
                    ...(CaptionStartElement ? { CaptionLabel: CaptionStartElement } : {}),
                    DayButton: (props) => {
                        const { children, ...buttonProps } = props;
                        return <button {...buttonProps}>{renderStartDay(props.day.date)}</button>;
                    },
                    Nav: (props) => (
                        <NavbarElement {...props} onTodayClick={(e) => handleTodayClick(new Date(), {}, e)} />
                    ),
                }}
                {...rest}
            />
            <LocalizedDayPicker
                className={clsx("pt-6 tracking-tightest max-w-[400px] rounded-lg ring-0 focus:outline-none focus:ring-0")}
                mode="single"
                selected={isStartDateIsTheSameMonth ? undefined : selectedDays?.to}
                month={endMonth}
                modifiers={isStartDateIsTheSameMonth ? {} : { ...modifiers, end: value?.to }}
                disabled={isDisabledEndDays}
                onSelect={(
                    day: Date | undefined,
                    _selectedDay: Date | undefined,
                    activeModifiers: any,
                    e: React.MouseEvent | React.KeyboardEvent,
                ) => handleDayClick(day, activeModifiers, e, false)}
                onMonthChange={handleEndMonthChange}
                classNames={datePickerClassNames}
                modifiersClassNames={datePickerModifiersClassNames}
                components={{
                    ...(CaptionEndElement ? { CaptionLabel: CaptionEndElement } : {}),
                    DayButton: (props) => {
                        const { children, ...buttonProps } = props;
                        return <button {...buttonProps}>{renderEndDay(props.day.date)}</button>;
                    },
                    Nav: (props) => <NavbarElement {...props} />,
                }}
                {...rest}
            />
        </div>
    );
};

export default RangeDatePicker;
