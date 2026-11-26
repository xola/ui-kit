import PropTypes from "prop-types";
import React, { useMemo } from "react";
import { now } from "../../utils/date";
import { Tooltip } from "../Tooltip";
import { createCaptionElement } from "./CaptionElement";
import { createDayMatcher, getDayPickerClassName } from "./DatePicker.helpers";
import { Day } from "./Day";
import { LocalizedDayPicker } from "./LocalizedDayPicker";
import { NavbarElement } from "./NavbarElement";

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
    locale,
    timezoneName,
    ...rest
}) => {
    const isStartDateIsTheSameMonth = now(value?.from, timezoneName).isSame(now(value?.to, timezoneName), "month");
    const isSingleDayDateRange = now(value?.from, timezoneName).isSame(now(value?.to, timezoneName), "day");

    const CaptionStartElement = useMemo(
        () =>
            createCaptionElement({
                shouldShowYearPicker,
                currentMonth: startMonth,
                locale,
                onChange: handleStartMonthChange,
            }),
        [shouldShowYearPicker, startMonth, locale, handleStartMonthChange],
    );
    const CaptionEndElement = useMemo(
        () =>
            createCaptionElement({
                shouldShowYearPicker,
                currentMonth: endMonth,
                locale,
                onChange: handleEndMonthChange,
            }),
        [shouldShowYearPicker, endMonth, locale, handleEndMonthChange],
    );

    const isDisabledStartDays = useMemo(
        () => createDayMatcher(disabledDays, timezoneName),
        [disabledDays, timezoneName],
    );

    const isDisabledEndDays = (date) => {
        const isDateBeforeStartDate = now(date, timezoneName).isBefore(value?.from, "day");

        return isDisabledStartDays(date) || (isDateBeforeStartDate && !isSingleDayDateRange);
    };

    const renderDay = (date, isDisabledDays, currentMonth) => {
        const tooltipContent = getTooltip?.(date);
        const disabled = isDisabledDays(date);

        const DayWrapper = tooltipContent ? Tooltip : React.Fragment;
        const dayWrapperProps = tooltipContent ? { placement: "top", content: tooltipContent } : {};

        return (
            <DayWrapper {...dayWrapperProps}>
                <Day
                    disabled={disabled}
                    selectedDate={value}
                    date={date}
                    getContent={getDayContent}
                    currentMonth={currentMonth}
                />
            </DayWrapper>
        );
    };

    const renderStartDay = (date) => {
        return renderDay(date, isDisabledStartDays, startMonth);
    };

    const renderEndDay = (date) => {
        return renderDay(date, isDisabledEndDays, endMonth);
    };

    return (
        <div className="flex gap-4">
            <LocalizedDayPicker
                className={getDayPickerClassName({
                    withMaxWidth: true,
                    isDateRangeStyle,
                    hasCustomContent: Boolean(getDayContent || modifiers.waitlist),
                })}
                month={startMonth}
                modifiers={{ ...modifiers, start: value?.from }}
                disabledDays={isDisabledStartDays}
                navbarElement={NavbarElement}
                captionElement={CaptionStartElement}
                selectedDays={[selectedDays?.from, selectedDays]}
                renderDay={renderStartDay}
                getTooltip={getTooltip}
                onDayClick={(day, options, event) => handleDayClick(day, options, event, true)}
                onMonthChange={handleStartMonthChange}
                onTodayButtonClick={handleTodayClick}
                {...rest}
            />
            <LocalizedDayPicker
                className={getDayPickerClassName({
                    withMaxWidth: true,
                    isDateRangeStyle,
                    hasCustomContent: Boolean(getDayContent || modifiers.waitlist),
                })}
                month={endMonth}
                modifiers={isStartDateIsTheSameMonth ? {} : { ...modifiers, end: value?.to }}
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
    timezoneName: PropTypes.string,
};

export default RangeDatePicker;
