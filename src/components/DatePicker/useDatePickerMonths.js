import { useMemoizedFn } from "ahooks";
import { useState } from "react";
import { getInitialCurrentMonth, getInitialEndMonth, getInitialStartMonth } from "./DatePicker.helpers";

/**
 * The change handlers report to `onMonthChange` and stay stable, so the captions built from them are not rebuilt every
 * render. `showRange` moves all three calendars without reporting.
 */
export const useDatePickerMonths = ({ value, variant, defaultMonth, timezoneName, onMonthChange }) => {
    const [currentMonth, setCurrentMonth] = useState(
        () => defaultMonth ?? getInitialCurrentMonth(value, variant, timezoneName),
    );
    const [leftMonth, setLeftMonth] = useState(() => defaultMonth ?? getInitialStartMonth(value));
    const [rightMonth, setRightMonth] = useState(() => getInitialEndMonth(value, timezoneName));

    const handleMonthChange = useMemoizedFn((month) => {
        setCurrentMonth(month);
        onMonthChange?.(month);
    });

    const handleLeftMonthChange = useMemoizedFn((month) => {
        setLeftMonth(month);
        onMonthChange?.(month);
    });

    const handleRightMonthChange = useMemoizedFn((month) => {
        setRightMonth(month);
        onMonthChange?.(month);
    });

    const showRange = useMemoizedFn(({ from, to }) => {
        setCurrentMonth(from);
        setLeftMonth(from);
        setRightMonth(to);
    });

    return {
        leftMonth,
        rightMonth,
        showRange,
        currentMonth,
        handleMonthChange,
        handleLeftMonthChange,
        handleRightMonthChange,
    };
};
