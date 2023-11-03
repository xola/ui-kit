import React from "react";
import PropTypes from "prop-types";
import DayPicker from "react-day-picker";
import clsx from "clsx";
import { NavbarElement } from "./NavbarElement";
import { MonthYearSelector } from "./MonthYearSelector";

const RangeDatePicker = ({
    getTooltip,
    value,
    getDayContent,
    isDateRangeStyle,
    shouldShowYearPicker,
    renderStartDay,
    renderEndDay,
    startMonth,
    disabledStartDays,
    disabledEndDays,
    endMonth,
    modifiers,
    selectedDays,
    handleDayClick,
    handleStartMonthChange,
    handleEndMonthChange,
    handleTodayClick,
    ...rest
}) => {
    const CaptionStartElement = shouldShowYearPicker
        ? ({ date }) => <MonthYearSelector date={date} currentMonth={startMonth} onChange={handleStartMonthChange} />
        : undefined;

    const CaptionEndElement = shouldShowYearPicker
        ? ({ date }) => <MonthYearSelector date={date} currentMonth={endMonth} onChange={handleEndMonthChange} />
        : undefined;

    return (
        <div className="flex gap-4">
            <DayPicker
                className={clsx(
                    "ui-date-picker max-w-[400px] rounded-lg pt-3",
                    isDateRangeStyle ? "date-range-picker" : null,
                    getDayContent ? "has-custom-content" : null,
                    modifiers.waitlist ? "has-custom-content" : null,
                )}
                isDateRangeStyle={isDateRangeStyle}
                month={startMonth}
                modifiers={{ ...modifiers, start: value.from }}
                disabledDays={disabledStartDays}
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
                isDateRangeStyle={isDateRangeStyle}
                month={endMonth}
                modifiers={{ ...modifiers, end: value.to }}
                disabledDays={disabledEndDays}
                navbarElement={NavbarElement}
                captionElement={CaptionEndElement}
                selectedDays={selectedDays}
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
