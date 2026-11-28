// MonthSelector, MonthYearSelector and MonthGrid format month names through dayjs, which needs its locales registered.
import "dayjs/locale/de.js";
import "dayjs/locale/en-gb.js";
import "dayjs/locale/es.js";
import "dayjs/locale/es-mx.js";
import "dayjs/locale/fr.js";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { isArray, isDate, isPlainObject, mapValues } from "lodash-es";
import { dateMatchModifiers, type DayPickerProps, type Matcher } from "react-day-picker";
import { de, enGB, enUS, es, fr } from "react-day-picker/locale";
import cn from "../../helpers/classnames";
import { isSame, now, toDate } from "../../utils/date";

type DayPickerLocaleProps = Pick<DayPickerProps, "locale" | "weekStartsOn">;

/** date-fns has no es-MX locale, and dayjs starts the es-MX week on Sunday where es starts it on Monday. */
const dayPickerLocales: Record<string, DayPickerLocaleProps> = {
    es: { locale: es },
    fr: { locale: fr },
    de: { locale: de },
    en: { locale: enUS },
    "en-gb": { locale: enGB },
    "es-mx": { locale: es, weekStartsOn: 0 },
};

export const getDayPickerLocale = (localeCode?: string) => {
    const normalized = (localeCode ?? "en").toLowerCase().replace("_", "-");
    const [language] = normalized.split("-");

    return dayPickerLocales[normalized] ?? dayPickerLocales[language] ?? dayPickerLocales.en;
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

const isRangeValue = (value: unknown): value is DateRangeValue => isPlainObject(value);

export const toDateRange = (value: DateRangeValue | null | undefined) => {
    return { from: value?.from ?? undefined, to: value?.to ?? undefined };
};

export const getSelectionMode = (selected: unknown): "single" | "range" => {
    return isRangeValue(selected) ? "range" : "single";
};

export const getSelectedValue = (
    selected: unknown,
    value: DateRangeValue | Date | Dayjs | null | undefined,
    isRangeVariant: boolean,
    timezoneName: string | null,
): unknown => {
    if (isRangeValue(selected)) {
        return toDateRange(selected);
    }

    if (selected) {
        return selected;
    }

    if (!value || dayjs.isDayjs(value)) {
        return value;
    }

    if (isRangeVariant) {
        return toDateRange(value as DateRangeValue);
    }

    return now(value, timezoneName).toDate();
};

export const addDayToRange = (day: Date, { from, to }: DateRangeValue): DateRangeValue => {
    return from ? { from, to: day } : { from: day, to };
};

/**
 * Applies a day click to a range picker value. A complete range restarts at the clicked day, a second click on the one
 * picked day selects that whole day, and any other click ends the range, or starts it when it lands on or before `from`.
 *
 * @param day the clicked day, as react-day-picker passes it
 * @param value the range before the click
 * @param timezoneName the seller timezone the clicked day is read in
 * @returns the range to report through `onChange`
 */
export const getNextRange = (day: Date, value: DateRangeValue, timezoneName: string | null): DateRangeValue => {
    const { from, to } = value;
    const pickedDay = from ?? to;
    const clicked = now(day, timezoneName);
    const clickedStart = toDate(clicked);

    if (hasRange(value)) {
        return { from: clickedStart, to: null };
    }

    const clickedEnd = toDate(clicked, false);

    if (pickedDay?.getTime() === day.getTime()) {
        return { from: clickedStart, to: clickedEnd };
    }

    const isClickOnOrBeforeFrom = Boolean(from) && !dayjs(from).isBefore(clickedStart, "day");
    if (isClickOnOrBeforeFrom) {
        return { from: clickedStart, to: toDate(now(from, timezoneName), false) };
    }

    return addDayToRange(clickedEnd, value);
};

type DayMatcher = Matcher | Matcher[] | null | undefined;

const toDayKey = (date: Date, timezoneName?: string | null) => now(date, timezoneName).format("YYYY-MM-DD");

const isDateList = (days: unknown): days is Date[] => isArray(days) && days.every(isDate);

// Date arrays are pre-computed into a Set of day keys: a per-cell `some()` over the array
// costs a timezone conversion per element per day cell.
export const createDayMatcher = (days: DayMatcher, timezoneName?: string | null): ((date: Date) => boolean) => {
    if (!days || (Array.isArray(days) && days.length === 0)) {
        return () => false;
    }

    if (isDateList(days)) {
        const keys = new Set(days.map((day) => toDayKey(day, timezoneName)));
        return (date) => keys.has(toDayKey(date, timezoneName));
    }

    return (date) => dateMatchModifiers(date, days);
};

export const getModifiersClassNames = (modifiers: Record<string, unknown> = {}) => {
    return mapValues(modifiers, (_, name) => `ui-day-${name}`);
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
