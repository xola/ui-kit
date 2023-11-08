import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import DayPicker from "react-day-picker";
import clsx from "clsx";
import dayjs from "dayjs";
import { isArray, isFunction } from "lodash";
import { Tooltip } from "../Tooltip";
import { NavbarElement } from "./NavbarElement";
import { MonthYearSelector } from "./MonthYearSelector";
import { Day } from "./Day";

const RangeDatePicker = ({
    getTooltip,
    value,
    getDayContent,
    isDateRangeStyle,
    shouldShowYearPicker,
    startMonth,
    disabledDays,
    endMonth,
    modifiers,
    selectedDays,
    handleDayClick,
    handleStartMonthChange,
    handleEndMonthChange,
    handleTodayClick,
    ...rest
}) => {
    const [initialEndDate] = useState(endMonth);
    const isTheSameMonth =
        dayjs(startMonth).isSame(dayjs(initialEndDate), "month") &&
        dayjs(endMonth).isSame(dayjs(initialEndDate), "month");

    const isStartDateIsTheSameMonth = dayjs(value?.from).isSame(dayjs(value?.to), "month");

    const CaptionStartElement = shouldShowYearPicker
        ? ({ date }) => <MonthYearSelector date={date} currentMonth={startMonth} onChange={handleStartMonthChange} />
        : undefined;

    const CaptionEndElement = shouldShowYearPicker
        ? ({ date }) => <MonthYearSelector date={date} currentMonth={endMonth} onChange={handleEndMonthChange} />
        : undefined;

    const isDisabledStartDays = (date) => {
        if (isFunction(disabledDays)) {
            return disabledDays(date) || dayjs(date).isAfter(value.to, "day");
        }

        if (isArray(disabledDays)) {
            return (
                disabledDays.some((_date) => dayjs(_date).isSame(date, "day")) || dayjs(date).isAfter(value.to, "day")
            );
        }

        return dayjs(date).isAfter(value.to, "day");
    };

    const isDisabledEndDays = (date) => {
        if (isStartDateIsTheSameMonth) {
            return true;
        }

        if (isFunction(disabledDays)) {
            return disabledDays(date) || dayjs(date).isBefore(value.from, "day");
        }

        if (isArray(disabledDays)) {
            return (
                disabledDays.some((_date) => dayjs(_date).isSame(date, "day")) ||
                dayjs(date).isBefore(value.from, "day")
            );
        }

        return dayjs(date).isBefore(value.from, "day");
    };

    const renderStartDay = (date) => {
        const tooltipContent = getTooltip?.(date);
        const disabled = isDisabledStartDays(date);

        return tooltipContent ? (
            <Tooltip placement="top" content={tooltipContent}>
                <Day
                    disabled={disabled}
                    selectedDate={value}
                    date={date}
                    getContent={getDayContent}
                    currentMonth={startMonth}
                />
            </Tooltip>
        ) : (
            <Day
                disabled={disabled}
                selectedDate={value}
                date={date}
                getContent={getDayContent}
                currentMonth={startMonth}
            />
        );
    };

    const renderEndDay = (date) => {
        const tooltipContent = getTooltip?.(date);
        const disabled = isDisabledEndDays(date);

        return tooltipContent ? (
            <Tooltip placement="top" content={tooltipContent}>
                <Day
                    disabled={disabled}
                    selectedDate={value}
                    date={date}
                    getContent={getDayContent}
                    currentMonth={endMonth}
                />
            </Tooltip>
        ) : (
            <Day
                disabled={disabled}
                selectedDate={value}
                date={date}
                getContent={getDayContent}
                currentMonth={endMonth}
            />
        );
    };

    useEffect(() => {
        if (dayjs(value?.from).isSame(dayjs(value?.to), "month")) {
            handleStartMonthChange(dayjs(value.from).toDate());
        }
    }, [value, handleStartMonthChange]);

    return (
        <div className="flex gap-4">
            <DayPicker
                className={clsx(
                    "ui-date-picker max-w-[400px] rounded-lg pt-3",
                    isDateRangeStyle ? "date-range-picker" : null,
                    getDayContent ? "has-custom-content" : null,
                    modifiers.waitlist ? "has-custom-content" : null,
                )}
                month={startMonth}
                modifiers={{ ...modifiers, start: value.from }}
                disabledDays={isDisabledStartDays}
                navbarElement={NavbarElement}
                captionElement={CaptionStartElement}
                selectedDays={selectedDays}
                renderDay={renderStartDay}
                getTooltip={getTooltip}
                onDayClick={(day, options, event) => handleDayClick(day, options, event, true)}
                onMonthChange={handleStartMonthChange}
                onTodayButtonClick={handleTodayClick}
                {...rest}
            />
            <DayPicker
                className={clsx(
                    "ui-date-picker max-w-[400px] rounded-lg pt-3",
                    isDateRangeStyle ? "date-range-picker" : null,
                    getDayContent ? "has-custom-content" : null,
                    modifiers.waitlist ? "has-custom-content" : null,
                )}
                month={isTheSameMonth ? dayjs(startMonth).add(1, "month").toDate() : endMonth}
                modifiers={isStartDateIsTheSameMonth ? {} : { ...modifiers, end: value.to }}
                disabledDays={isDisabledEndDays}
                navbarElement={NavbarElement}
                captionElement={CaptionEndElement}
                selectedDays={isStartDateIsTheSameMonth ? [] : selectedDays}
                renderDay={renderEndDay}
                getTooltip={getTooltip}
                onDayClick={(day, options, event) => handleDayClick(day, options, event, false)}
                onMonthChange={handleEndMonthChange}
                onTodayButtonClick={handleTodayClick}
                {...rest}
            />
        </div>
    );
};

RangeDatePicker.propTypes = {
    getTooltip: PropTypes.func,
    value: PropTypes.object,
    getDayContent: PropTypes.func,
    isDisabled: PropTypes.func,
    isDateRangeStyle: PropTypes.bool,
    startMonth: PropTypes.instanceOf(Date),
    endMonth: PropTypes.instanceOf(Date),
    modifiers: PropTypes.object,
    disabledStartDays: PropTypes.func,
    disabledEndDays: PropTypes.func,
    handleDayClick: PropTypes.func,
    handleStartMonthChange: PropTypes.func,
    handleEndMonthChange: PropTypes.func,
    handleTodayClick: PropTypes.func,
};

export default RangeDatePicker;
