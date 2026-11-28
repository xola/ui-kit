import { describe, expect, test } from "vitest";
import { enGB, es } from "react-day-picker/locale";
import {
    addDayToRange,
    createDayMatcher,
    getDayPickerLocale,
    getModifiersClassNames,
    getNextRange,
    getSelectedValue,
    getSelectionMode,
    toDateRange,
} from "./DatePicker.helpers";
import { now, toDate } from "../../utils/date";

const day = (offset) => new Date(Date.now() + offset * 24 * 60 * 60 * 1000);

describe("getDayPickerLocale", () => {
    test.each([undefined, "", "en", "en_US", "en-us", "xx"])(
        "falls back to a Sunday-first English locale for %j",
        (code) => {
            const { locale, weekStartsOn } = getDayPickerLocale(code);

            expect(locale.code).toBe("en-US");
            expect(weekStartsOn).toBeUndefined();
        },
    );

    test("maps the region variants", () => {
        expect(getDayPickerLocale("en-GB").locale).toBe(enGB);
        expect(getDayPickerLocale("es_ES").locale).toBe(es);
    });

    test("starts the es-MX week on Sunday", () => {
        expect(getDayPickerLocale("es-MX")).toEqual({ locale: es, weekStartsOn: 0 });
    });

    test("uses the language for an unknown region", () => {
        expect(getDayPickerLocale("fr-CA").locale.code).toBe("fr");
    });
});

describe("addDayToRange", () => {
    test("ends a range whose start is picked", () => {
        const from = day(-3);
        const clicked = day(2);

        expect(addDayToRange(clicked, { from, to: null })).toEqual({ from, to: clicked });
    });

    test("starts a range that has no start", () => {
        const clicked = day(2);

        expect(addDayToRange(clicked, { from: null, to: null })).toEqual({ from: clicked, to: null });
    });
});

describe("getNextRange", () => {
    const startOf = (date) => toDate(now(date, null));
    const endOf = (date) => toDate(now(date, null), false);

    test("restarts a complete range at the clicked day", () => {
        const clicked = day(5);
        const range = { from: day(-3), to: day(2) };

        expect(getNextRange(clicked, range, null)).toEqual({ from: startOf(clicked), to: null });
    });

    test("selects the whole day on a second click of the picked day", () => {
        const picked = day(1);
        const expected = { from: startOf(picked), to: endOf(picked) };

        expect(getNextRange(new Date(picked), { from: picked, to: null }, null)).toEqual(expected);
        expect(getNextRange(new Date(picked), { from: null, to: picked }, null)).toEqual(expected);
    });

    test("ends the range at a day after the start", () => {
        const from = day(-2);
        const clicked = day(3);

        expect(getNextRange(clicked, { from, to: null }, null)).toEqual({ from, to: endOf(clicked) });
    });

    test("moves the start to a day before it and ends the range at the old start", () => {
        const from = day(3);
        const clicked = day(-1);

        expect(getNextRange(clicked, { from, to: null }, null)).toEqual({ from: startOf(clicked), to: endOf(from) });
    });

    test("treats another time on the start day as on or before the start", () => {
        const from = day(2);
        const clicked = startOf(from);

        expect(getNextRange(clicked, { from, to: null }, null)).toEqual({ from: clicked, to: endOf(from) });
    });

    test("starts an empty range at the end of the clicked day", () => {
        const clicked = day(2);

        expect(getNextRange(clicked, { from: null, to: null }, null)).toEqual({ from: endOf(clicked), to: null });
    });
});

describe("createDayMatcher", () => {
    test.each([undefined, null, []])("matches nothing for %j", (days) => {
        expect(createDayMatcher(days)(day(0))).toBe(false);
    });

    test("matches a Date list by calendar day", () => {
        const matcher = createDayMatcher([day(1)]);

        expect(matcher(day(1))).toBe(true);
        expect(matcher(day(2))).toBe(false);
    });

    test("calls a function matcher", () => {
        const matcher = createDayMatcher((date) => date.getTime() > Date.now());

        expect(matcher(day(1))).toBe(true);
        expect(matcher(day(-1))).toBe(false);
    });

    test("handles the DayPicker matcher objects", () => {
        const matcher = createDayMatcher({ before: day(0) });

        expect(matcher(day(-2))).toBe(true);
        expect(matcher(day(2))).toBe(false);
    });

    test("handles a mix of matchers in one list", () => {
        const matcher = createDayMatcher([day(1), { before: day(-5) }]);

        expect(matcher(day(1))).toBe(true);
        expect(matcher(day(-8))).toBe(true);
        expect(matcher(day(3))).toBe(false);
    });
});

describe("selection helpers", () => {
    test("toDateRange turns null ends into undefined", () => {
        expect(toDateRange({ from: null, to: null })).toEqual({ from: undefined, to: undefined });
        expect(toDateRange(undefined)).toEqual({ from: undefined, to: undefined });
    });

    test("getSelectionMode follows the shape of the selection", () => {
        expect(getSelectionMode({ from: day(0), to: day(1) })).toBe("range");
        expect(getSelectionMode(day(0))).toBe("single");
        expect(getSelectionMode(undefined)).toBe("single");
    });

    test("getSelectedValue prefers an explicit selection", () => {
        const explicit = day(4);

        expect(getSelectedValue(explicit, day(0), false, null)).toBe(explicit);
    });

    test("getSelectedValue normalises a range value", () => {
        const from = day(0);

        expect(getSelectedValue(undefined, { from, to: null }, true, null)).toEqual({ from, to: undefined });
    });

    test("getSelectedValue passes an empty value through", () => {
        expect(getSelectedValue(undefined, undefined, false, null)).toBeUndefined();
    });
});

describe("getModifiersClassNames", () => {
    test("names a class per modifier", () => {
        expect(getModifiersClassNames({ waitlist: [day(0)], sunday: { dayOfWeek: [0] } })).toEqual({
            waitlist: "ui-day-waitlist",
            sunday: "ui-day-sunday",
        });
    });

    test("returns nothing without modifiers", () => {
        expect(getModifiersClassNames()).toEqual({});
    });
});
