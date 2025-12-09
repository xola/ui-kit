import { de, enGB, enUS, es, fr, type Locale } from "date-fns/locale";

export type LocaleCode = keyof typeof locales;

export type LocalizationProps = {
    locale: Locale;
};

const locales = {
    en: enUS,
    "en-US": enUS,
    "en-GB": enGB,

    es: es,
    "es-ES": es,
    "es-MX": es,

    fr: fr,
    de: de,
};

export const getLocalizationProps = async (localeCode: LocaleCode): Promise<Partial<LocalizationProps>> => {
    try {
        const locale = locales[localeCode];

        return {
            locale,
        };
    } catch (error) {
        console.error("Error: React Day Picker localization error", error);
        throw error;
    }
};
