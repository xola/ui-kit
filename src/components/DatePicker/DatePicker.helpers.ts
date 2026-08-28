import * as de from "dayjs/locale/de.js";
import * as en from "dayjs/locale/en.js";
import * as enGB from "dayjs/locale/en-gb.js";
import * as es from "dayjs/locale/es.js";
import * as esMX from "dayjs/locale/es-mx.js";
import * as fr from "dayjs/locale/fr.js";
import type { DayPickerProps } from "react-day-picker";

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
