import * as de from "dayjs/locale/de";
import * as en from "dayjs/locale/en";
import * as enGB from "dayjs/locale/en-gb";
import * as es from "dayjs/locale/es";
import * as esMX from "dayjs/locale/es-mx";
import * as fr from "dayjs/locale/fr";

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

export const getLocalizationProps = async (localeCode) => {
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
