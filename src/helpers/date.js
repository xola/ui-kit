import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
dayjs.extend(customParseFormat);
dayjs.extend(LocalizedFormat);
dayjs.extend(quarterOfYear);

const dayjsLocales = new Set([
    "af",
    "ar",
    "ar-dz",
    "ar-kw",
    "ar-ly",
    "ar-ma",
    "ar-sa",
    "ar-tn",
    "az",
    "be",
    "bg",
    "bm",
    "bn",
    "bo",
    "br",
    "bs",
    "ca",
    "cs",
    "cv",
    "cy",
    "da",
    "de",
    "de-at",
    "de-ch",
    "dv",
    "el",
    "en",
    "en-au",
    "en-ca",
    "en-gb",
    "en-ie",
    "en-il",
    "en-nz",
    "en-SG",
    "eo",
    "es",
    "es-do",
    "es-us",
    "et",
    "eu",
    "fa",
    "fi",
    "fo",
    "fr",
    "fr-ca",
    "fr-ch",
    "fy",
    "ga",
    "gd",
    "gl",
    "gom-latn",
    "gu",
    "he",
    "hi",
    "hr",
    "hu",
    "hy-am",
    "id",
    "is",
    "it",
    "it-ch",
    "ja",
    "jv",
    "ka",
    "kk",
    "km",
    "kn",
    "ko",
    "ku",
    "ky",
    "lb",
    "lo",
    "lt",
    "lv",
    "me",
    "mi",
    "mk",
    "ml",
    "mn",
    "mr",
    "ms",
    "ms-my",
    "mt",
    "my",
    "nb",
    "ne",
    "nl",
    "nl-be",
    "nn",
    "oc-lnc",
    "pa-in",
    "pl",
    "pt",
    "pt-br",
    "ro",
    "ru",
    "sd",
    "se",
    "si",
    "sk",
    "sl",
    "sq",
    "sr",
    "sr-cyrl",
    "ss",
    "sv",
    "sw",
    "ta",
    "te",
    "tet",
    "tg",
    "th",
    "tl-ph",
    "tlh",
    "tr",
    "tzl",
    "tzm",
    "tzm-latn",
    "ug-cn",
    "uk",
    "ur",
    "uz",
    "uz-latn",
    "vi",
    "x-pseudo",
    "yo",
    "zh-cn",
    "zh-hk",
    "zh-tw",
]);

// solution got from here: https://github.com/iamkun/dayjs/issues/732#issuecomment-554383261
export const getDayJsLocale = () => {
    const navLangs = navigator.languages || (navigator.language ? [navigator.language] : []);

    if (navLangs.length > 0) {
        const checkLocale = (locale) => {
            if (["en", "en-us"].includes(locale)) return null;
            if (locale === "zn") return "zh-cn";
            if (locale === "no") return "nb";
            if (dayjsLocales.has(locale)) return locale;
            return null;
        };

        for (let lang of navLangs) {
            lang = lang.toLowerCase();
            const locale = checkLocale(lang) || (lang.includes("-") && checkLocale(lang.split("-")[0]));

            if (locale) {
                return import(`dayjs/locale/${locale}.js`);
            }
        }
    }

    return Promise.resolve();
};

export const formatDate = (date, format = "YYYY-MM-DD") => {
    return dayjs(date).format(format);
};

export const formatTime = (time, format = "h:mm a") => {
    const stringTime = String(time).padStart(4, 0); // 700 to 0700
    return dayjs(stringTime, "hhmm").format(format);
};

export const dateFromObjectId = (id) => {
    return dayjs(new Date(Number.parseInt(id.slice(0, 8), 16) * 1000));
};
