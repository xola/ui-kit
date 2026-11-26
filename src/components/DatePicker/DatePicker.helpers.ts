import * as de from "dayjs/locale/de.js";
import * as en from "dayjs/locale/en.js";
import * as enGB from "dayjs/locale/en-gb.js";
import * as es from "dayjs/locale/es.js";
import * as esMX from "dayjs/locale/es-mx.js";
import * as fr from "dayjs/locale/fr.js";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { isArray, isFunction } from "lodash-es";
import type { DayPickerProps } from "react-day-picker";
import cn from "../../helpers/classnames";
import { isSame, now } from "../../utils/date";

export type LocaleCode = keyof typeof locales;

interface ExtendedDayPickerProps extends DayPickerProps {
    monthsShort?: string[];
}

export type LocalizationProps = Pick<
    ExtendedDayPickerProps,
    "locale" | "months" | "monthsShort" | "weekdaysLong" | "weekdaysShort" | "firstDayOfWeek"
>;

const locales = {
    en: en,
    "en-US": en,
    "en-GB": enGB,

    es: es,
    "es-ES": es,
    "es-MX": esMX,

    fr: fr,
    de: de,
};

export const getLocalizationProps = async (localeCode: LocaleCode): Promise<Partial<LocalizationProps>> => {
    try {
        const locale = await locales[localeCode];

        return {
            locale: localeCode,
            weekdaysLong: locale.weekdays,
            weekdaysShort: locale.weekdaysShort,
            months: locale.months,
            monthsShort: locale.monthsShort,
            firstDayOfWeek: locale.weekStart,
        };
    } catch (error) {
        console.error("Error: React Day Picker localization error", error);
        throw error;
    }
};

export const variants = {
    single: "single",
    range: "range",
} as const;

export interface DateRangeValue {
    from?: Date | null;
    to?: Date | null;
}

export const hasRange = (days: DateRangeValue | null | undefined): boolean => Boolean(days?.from && days?.to);

export const hasDistinctRange = (days: DateRangeValue | null | undefined): boolean => {
    if (!days?.from || !days?.to) {
        return false;
    }

    return days.from.getTime() !== days.to.getTime();
};

export const getRangeModifier = (
    isRangeVariant: boolean,
    value: DateRangeValue | null | undefined,
    selectedDays: DateRangeValue | null | undefined,
): { start: Date; end: Date } | null => {
    if (isRangeVariant && value?.from && value?.to) {
        return { start: value.from, end: value.to };
    }

    if (selectedDays?.from && selectedDays?.to) {
        return { start: selectedDays.from, end: selectedDays.to };
    }

    return null;
};

export const getInitialStartMonth = (value: DateRangeValue | null | undefined): Date => value?.from ?? new Date();

export const getInitialEndMonth = (value: DateRangeValue | null | undefined, timezoneName: string | null): Date => {
    if (!value?.from || !value?.to) {
        return now(null, timezoneName).add(1, "month").toDate();
    }

    return isSame(now(value.to, timezoneName), now(value.from, timezoneName), "month")
        ? now(value.from, timezoneName).add(1, "month").toDate()
        : value.to;
};

export const getInitialCurrentMonth = (
    value: DateRangeValue | Date | null | undefined,
    variant: string,
    timezoneName: string | null,
): Date => {
    const initialValue = value
        ? variant === variants.single
            ? (value as Date)
            : ((value as DateRangeValue).from ?? null)
        : null;
    return initialValue ?? now(null, timezoneName).toDate();
};

export const getSelectedDaysValues = (
    selectedDays: unknown,
    value: DateRangeValue | Date | Dayjs | null | undefined,
    isRangeVariant: boolean,
    timezoneName: string | null,
): unknown => {
    if (selectedDays) {
        return selectedDays;
    }

    if (!value || dayjs.isDayjs(value) || isRangeVariant) {
        return value;
    }

    return now(value, timezoneName).toDate();
};

type DayMatcher = Date[] | ((date: Date) => boolean) | null | undefined;

const toDayKey = (date: Date, timezoneName?: string | null): string => now(date, timezoneName).format("YYYY-MM-DD");

// Array matchers are pre-computed into a Set of day keys: a per-cell `some()` over the array
// costs a timezone conversion per element per day cell (see X2-9122 for the cost of `now` with a tz).
export const createDayMatcher = (days: DayMatcher, timezoneName?: string | null): ((date: Date) => boolean) => {
    if (isArray(days)) {
        const keys = new Set(days.map((day) => toDayKey(day, timezoneName)));
        return (date) => keys.has(toDayKey(date, timezoneName));
    }

    if (isFunction(days)) {
        return (date) => days(date);
    }

    return () => false;
};

interface DayPickerClassNameOptions {
    isDateRangeStyle?: boolean;
    isDateSelectedRangeStyle?: boolean;
    hasCustomContent?: boolean;
    withMaxWidth?: boolean;
}

export const getDayPickerClassName = ({
    isDateRangeStyle = false,
    isDateSelectedRangeStyle = false,
    hasCustomContent = false,
    withMaxWidth = false,
}: DayPickerClassNameOptions = {}): string => {
    return cn(
        "ui-date-picker rounded-lg pt-3",
        (withMaxWidth || isDateSelectedRangeStyle) && "max-w-[400px]",
        (isDateRangeStyle || isDateSelectedRangeStyle) && "date-range-picker",
        hasCustomContent && "has-custom-content",
    );
};
