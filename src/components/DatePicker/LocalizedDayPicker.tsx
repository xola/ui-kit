import React from "react";
import { DayPicker, type DayPickerProps } from "react-day-picker";
import { getDayPickerLocale } from "./DatePicker.helpers";

type LocalizedDayPickerProps = DayPickerProps & { localeCode: string };

/**
 * react-day-picker only follows a changing `selected` when `onSelect` is set. Without it, `selected` is the initial
 * value of its own state, so a Today click or a new `value` from the parent would not move the selection.
 */
const keepSelectionControlled = () => undefined;

export const LocalizedDayPicker = ({ localeCode, ...rest }: LocalizedDayPickerProps) => {
    return <DayPicker onSelect={keepSelectionControlled} {...getDayPickerLocale(localeCode)} {...rest} />;
};
