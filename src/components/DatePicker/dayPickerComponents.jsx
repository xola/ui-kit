import PropTypes from "prop-types";
import React, { createContext, useContext, useMemo } from "react";
import { DayButton } from "react-day-picker";
import { Tooltip } from "../Tooltip";
import { createCaptionElement } from "./CaptionElement";
import { Day } from "./Day";
import { NavbarElement } from "./NavbarElement";

/**
 * DayPicker renders `components.DayButton` as a component type, so a new one per render would remount every cell and
 * drop keyboard focus. The per-picker data comes through this context and the component itself stays module-level.
 */
export const PickerDayContext = createContext({});

/**
 * The button stays focusable but is not natively disabled: a disabled button swallows hover, and a disabled day can
 * still carry a tooltip.
 */
export const PickerDayButton = ({ day, modifiers, ...buttonProps }) => {
    const { value, getContent, getTooltip, isLoading } = useContext(PickerDayContext);
    const { date } = day;
    const { disabled, outside } = modifiers;
    const isDisabled = Boolean(disabled);
    const tooltipContent = getTooltip?.(date);

    const content = (
        <Day
            disabled={isDisabled}
            isLoading={Boolean(isLoading?.(date))}
            isCurrentMonth={!outside}
            selectedDate={value}
            date={date}
            getContent={getContent}
        />
    );

    const cell = tooltipContent ? (
        <Tooltip placement="top" content={tooltipContent}>
            {content}
        </Tooltip>
    ) : (
        content
    );

    return (
        <DayButton
            day={day}
            modifiers={modifiers}
            {...buttonProps}
            disabled={undefined}
            aria-disabled={isDisabled || undefined}
        >
            {cell}
        </DayButton>
    );
};

PickerDayButton.propTypes = {
    day: PropTypes.shape({ date: PropTypes.instanceOf(Date).isRequired }).isRequired,
    modifiers: PropTypes.object.isRequired,
};

/**
 * `createCaptionElement` returns a new component type per call, which DayPicker would remount, so the map is memoized on
 * the caption inputs. An undefined `MonthCaption` would replace DayPicker's own caption, so it is only set when a
 * selector is shown.
 */
export const useDayPickerComponents = ({
    shouldShowYearPicker,
    shouldShowMonthSelector = false,
    month,
    locale,
    onMonthChange,
}) => {
    return useMemo(() => {
        const MonthCaption = createCaptionElement({
            shouldShowYearPicker,
            shouldShowMonthSelector,
            locale,
            currentMonth: month,
            onChange: onMonthChange,
        });

        return { DayButton: PickerDayButton, Nav: NavbarElement, ...(MonthCaption && { MonthCaption }) };
    }, [shouldShowYearPicker, shouldShowMonthSelector, month, locale, onMonthChange]);
};
