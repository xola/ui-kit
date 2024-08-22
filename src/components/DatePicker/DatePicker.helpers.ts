import * as de from "dayjs/locale/de";
import * as en from "dayjs/locale/en";
import * as enGB from "dayjs/locale/en-gb";
import * as es from "dayjs/locale/es";
import * as esMX from "dayjs/locale/es-mx";
import * as fr from "dayjs/locale/fr";
import type { DayPickerProps } from "react-day-picker";

export type LocaleCode = keyof typeof locales;

interface ExtendedDayPickerProps extends DayPickerProps {
    monthsShort?: string;
}

export type LocalizationProps = Pick<
    ExtendedDayPickerProps,
    "locale" | "months" | "monthsShort" | "weekdaysLong" | "weekdaysShort" | "firstDayOfWeek"
>;

const locales = {
    en: en,
    en_US: en,
    en_GB: enGB,

    es: es,
    es_ES: es,
    es_MX: esMX,

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
