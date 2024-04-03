import type { DayPickerProps } from "react-day-picker";

export type LocaleCode = keyof typeof locales;

export type LocalizationProps = Pick<
    DayPickerProps,
    "locale" | "months" | "weekdaysLong" | "weekdaysShort" | "firstDayOfWeek"
>;

const locales = {
    en: import("dayjs/locale/en"),
    en_US: import("dayjs/locale/en"),
    en_GB: import("dayjs/locale/en-gb"),

    es: import("dayjs/locale/es"),
    es_ES: import("dayjs/locale/es"),
    es_MX: import("dayjs/locale/es-mx"),
};

export const getLocalizationProps = async (localeCode: LocaleCode): Promise<Partial<LocalizationProps>> => {
    try {
        const locale = await locales[localeCode];

        return {
            locale: localeCode,
            weekdaysLong: locale.weekdays,
            weekdaysShort: locale.weekdaysShort,
            months: locale.months,
            firstDayOfWeek: locale.weekStart,
        };
    } catch (error) {
        console.error("Error: React Day Picker localization error", error);
        throw error;
    }
};
