import { noop } from "lodash-es";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, test, vi } from "vitest";
import { formatDate } from "../../utils/date";
import { handlers, rangeLabels, RelativeDateRange } from "./RelativeDateRange";

// Noon UTC maps to the same calendar date (2026-06-15) on every machine in UTC-11..UTC+13,
// so the no-timezone cases below are stable across developer machines and CI.
const FIXED_NOW = new Date("2026-06-15T12:00:00Z");

const format = (date) => formatDate(date, "YYYY-MM-DD HH:mm:ss");

const range = (from, to) => ({ from: `${from} 00:00:00`, to: `${to} 23:59:59` });

// Expected from/to for every range at FIXED_NOW. Named timezones are deterministic;
// the undefined-timezone case follows the machine timezone (see FIXED_NOW note above).
const EXPECTED = {
    "P1D,yesterday": range("2026-06-14", "2026-06-14"),
    "P1D,today": range("2026-06-15", "2026-06-15"),
    "P1D,next day": range("2026-06-16", "2026-06-16"),
    "P1W,last week": range("2026-06-07", "2026-06-13"),
    "P1W,-1 week": range("2026-06-08", "2026-06-14"),
    "P1W,this week": range("2026-06-14", "2026-06-20"),
    "P1W,next week": range("2026-06-21", "2026-06-27"),
    "P1W,+1 week": range("2026-06-15", "2026-06-21"),
    "P1M,first day of last month": range("2026-05-01", "2026-05-31"),
    "P1M,-1 month": range("2026-05-15", "2026-06-14"),
    "P1M,first day of this month": range("2026-06-01", "2026-06-30"),
    "P1M,next month": range("2026-07-01", "2026-07-31"),
    "P1M,+1 month": range("2026-06-15", "2026-07-14"),
    "P3M,first day of last quarter": range("2026-01-01", "2026-03-31"),
    "P3M,-3 months": range("2026-03-15", "2026-06-14"),
    "P3M,first day of this quarter": range("2026-04-01", "2026-06-30"),
    "P3M,next quarter": range("2026-07-01", "2026-09-30"),
    "P3M,+3 months": range("2026-06-15", "2026-09-14"),
    "P1Y,first day of January last year": range("2025-01-01", "2025-12-31"),
    "P1Y,-1 year": range("2025-06-15", "2026-06-14"),
    "P1Y,first day of this year": range("2026-01-01", "2026-12-31"),
    "P1Y,next year": range("2027-01-01", "2027-12-31"),
    "P1Y,+1 year": range("2026-06-15", "2027-06-14"),
};

describe("RelativeDateRange handlers", () => {
    afterEach(() => {
        vi.useRealTimers();
    });

    test.each(Object.entries(EXPECTED))("%s", (option, expected) => {
        vi.useFakeTimers();
        vi.setSystemTime(FIXED_NOW);

        for (const timezone of [undefined, "America/Los_Angeles", "Asia/Kathmandu"]) {
            const { from, to } = handlers[option](timezone);
            expect({ from: format(from), to: format(to) }).toEqual(expected);
        }
    });

    test("every labeled range has a handler", () => {
        expect(Object.keys(handlers).sort()).toEqual(Object.keys(rangeLabels).sort());
    });

    // Guards the generated optgroups: a typo'd name in rangeGroups would render value/label undefined.
    test("dropdown renders all 23 ranges in 5 labeled groups", () => {
        const html = renderToStaticMarkup(
            <RelativeDateRange isFutureDatesAllowed value="" onChange={noop} onSubmit={noop} />,
        );

        expect(html.match(/<optgroup/g)).toHaveLength(5);
        expect(html.match(/<option/g)).toHaveLength(24); // 23 ranges + the placeholder
        for (const label of ["Day", "Week", "Month", "Quarter", "Year"]) {
            expect(html).toContain(`label="${label}"`);
        }

        expect(html).not.toContain("undefined");
    });
});
