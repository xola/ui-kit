import { capitalize } from "lodash-es";
import PropTypes from "prop-types";
import React from "react";
import { now, toDate } from "../../utils/date";
import { Button } from "../Buttons/Button";
import { Select } from "../Forms/Select";

const rangeOptions = {
    // Day
    YESTERDAY: "P1D,yesterday",
    TODAY: "P1D,today",
    NEXT_DAY: "P1D,next day",

    // Week
    LAST_WEEK: "P1W,last week",
    TRAILING_WEEK: "P1W,-1 week",
    THIS_WEEK: "P1W,this week",
    NEXT_WEEK: "P1W,next week",
    LEADING_WEEK: "P1W,+1 week",

    // Month
    LAST_MONTH: "P1M,first day of last month",
    TRAILING_MONTH: "P1M,-1 month",
    THIS_MONTH: "P1M,first day of this month",
    NEXT_MONTH: "P1M,next month",
    LEADING_MONTH: "P1M,+1 month",

    // Quarter
    LAST_QUARTER: "P3M,first day of last quarter",
    TRAILING_QUARTER: "P3M,-3 months",
    THIS_QUARTER: "P3M,first day of this quarter",
    NEXT_QUARTER: "P3M,next quarter",
    LEADING_QUARTER: "P3M,+3 months",

    // Year
    LAST_YEAR: "P1Y,first day of January last year",
    TRAILING_YEAR: "P1Y,-1 year",
    THIS_YEAR: "P1Y,first day of this year",
    NEXT_YEAR: "P1Y,next year",
    LEADING_YEAR: "P1Y,+1 year",
};

export const rangeLabels = {
    // Day
    [rangeOptions.YESTERDAY]: "Yesterday",
    [rangeOptions.TODAY]: "Today",
    [rangeOptions.NEXT_DAY]: "Next Day",

    // Week
    [rangeOptions.LAST_WEEK]: "Last Week",
    [rangeOptions.TRAILING_WEEK]: "Trailing Week",
    [rangeOptions.THIS_WEEK]: "This Week",
    [rangeOptions.NEXT_WEEK]: "Next Week",
    [rangeOptions.LEADING_WEEK]: "Leading Week",

    // Month
    [rangeOptions.LAST_MONTH]: "Last Month",
    [rangeOptions.TRAILING_MONTH]: "Trailing Month",
    [rangeOptions.THIS_MONTH]: "This Month",
    [rangeOptions.NEXT_MONTH]: "Next Month",
    [rangeOptions.LEADING_MONTH]: "Leading Month",

    // Quarter
    [rangeOptions.LAST_QUARTER]: "Last Quarter",
    [rangeOptions.TRAILING_QUARTER]: "Trailing Quarter",
    [rangeOptions.THIS_QUARTER]: "This Quarter",
    [rangeOptions.NEXT_QUARTER]: "Next Quarter",
    [rangeOptions.LEADING_QUARTER]: "Leading Quarter",

    // Year
    [rangeOptions.LAST_YEAR]: "Last Year",
    [rangeOptions.TRAILING_YEAR]: "Trailing Year",
    [rangeOptions.THIS_YEAR]: "This Year",
    [rangeOptions.NEXT_YEAR]: "Next Year",
    [rangeOptions.LEADING_YEAR]: "Leading Year",
};

// Dropdown groups and their options, in render order.
const rangeGroups = {
    day: ["YESTERDAY", "TODAY", "NEXT_DAY"],
    week: ["LAST_WEEK", "TRAILING_WEEK", "THIS_WEEK", "NEXT_WEEK", "LEADING_WEEK"],
    month: ["LAST_MONTH", "TRAILING_MONTH", "THIS_MONTH", "NEXT_MONTH", "LEADING_MONTH"],
    quarter: ["LAST_QUARTER", "TRAILING_QUARTER", "THIS_QUARTER", "NEXT_QUARTER", "LEADING_QUARTER"],
    year: ["LAST_YEAR", "TRAILING_YEAR", "THIS_YEAR", "NEXT_YEAR", "LEADING_YEAR"],
};

const defaultRanges = Object.keys(rangeGroups);

const dateRangeEntries = Object.entries(rangeGroups).map(([key, optionNames]) => [
    key,
    {
        label: capitalize(key),
        rangeOptions: optionNames.map((name) => ({
            value: rangeOptions[name],
            label: rangeLabels[rangeOptions[name]],
        })),
    },
]);
const dateRanges = Object.fromEntries(dateRangeEntries);

const filterFutureDates = (rangeOptions, isFutureDatesAllowed, futureDates) => {
    if (!isFutureDatesAllowed) {
        return rangeOptions.filter((option) => !futureDates.has(option.value));
    }

    return rangeOptions;
};

const futureDates = new Set([
    rangeOptions.NEXT_DAY,
    rangeOptions.NEXT_WEEK,
    rangeOptions.NEXT_MONTH,
    rangeOptions.NEXT_QUARTER,
    rangeOptions.NEXT_YEAR,
    rangeOptions.LEADING_WEEK,
    rangeOptions.LEADING_MONTH,
    rangeOptions.LEADING_QUARTER,
    rangeOptions.LEADING_YEAR,
]);

/** Range spanning the whole unit (day, week, month, quarter, year) `offset` units from today. */
const wholePeriod = (offset, unit) => (timezone) => {
    const date = now(null, timezone).add(offset, unit);
    return {
        from: toDate(date.startOf(unit)),
        to: toDate(date.endOf(unit), false),
    };
};

/** The `amount`/`unit` window ending yesterday. */
const trailing = (amount, unit) => (timezone) => {
    return {
        from: toDate(now(null, timezone).subtract(amount, unit).startOf("day")),
        to: toDate(now(null, timezone).subtract(1, "day").endOf("day"), false),
    };
};

/** Today through `amount`/`unit` out, less a day. */
const leading = (amount, unit) => (timezone) => {
    const today = now(null, timezone);
    return {
        from: toDate(today.startOf("day")),
        to: toDate(today.add(amount, unit).subtract(1, "day").endOf("day"), false),
    };
};

// Exported for the characterization test; not part of the package API (not in src/index.js).
export const handlers = {
    [rangeOptions.YESTERDAY]: wholePeriod(-1, "day"),
    [rangeOptions.TODAY]: wholePeriod(0, "day"),
    [rangeOptions.NEXT_DAY]: wholePeriod(1, "day"),

    [rangeOptions.LAST_WEEK]: wholePeriod(-1, "week"),
    [rangeOptions.TRAILING_WEEK]: trailing(7, "day"),
    [rangeOptions.THIS_WEEK]: wholePeriod(0, "week"),
    [rangeOptions.NEXT_WEEK]: wholePeriod(1, "week"),
    [rangeOptions.LEADING_WEEK]: leading(1, "week"),

    [rangeOptions.LAST_MONTH]: wholePeriod(-1, "month"),
    [rangeOptions.TRAILING_MONTH]: trailing(1, "month"),
    [rangeOptions.THIS_MONTH]: wholePeriod(0, "month"),
    [rangeOptions.NEXT_MONTH]: wholePeriod(1, "month"),
    [rangeOptions.LEADING_MONTH]: leading(1, "month"),

    [rangeOptions.LAST_QUARTER]: wholePeriod(-1, "quarter"),
    [rangeOptions.TRAILING_QUARTER]: trailing(3, "month"),
    [rangeOptions.THIS_QUARTER]: wholePeriod(0, "quarter"),
    [rangeOptions.NEXT_QUARTER]: wholePeriod(1, "quarter"),
    [rangeOptions.LEADING_QUARTER]: leading(3, "month"),

    [rangeOptions.LAST_YEAR]: wholePeriod(-1, "year"),
    [rangeOptions.TRAILING_YEAR]: trailing(1, "year"),
    [rangeOptions.THIS_YEAR]: wholePeriod(0, "year"),
    [rangeOptions.NEXT_YEAR]: wholePeriod(1, "year"),
    [rangeOptions.LEADING_YEAR]: leading(1, "year"),
};

export const RelativeDateRange = ({
    showApply = true, // TODO: Prop name (showApply) doesn't match rule (^(is|has|should)[A-Z]([A-Za-z0-9]?)+)
    isFutureDatesAllowed = false, // This prop used to be able to select Future Dates in RelativeDateRange,
    value,
    timezoneName,
    onChange,
    onSubmit,
}) => {
    const handleChange = (e) => {
        const rangeName = e.target.value;
        const range = handlers[rangeName](timezoneName);
        onChange(rangeName, range);
    };

    return (
        <div className="flex space-x-2">
            <Select size="medium" value={value} className="pr-8 leading-5" onChange={handleChange}>
                <option value="">Relative Date Range</option>
                {defaultRanges.map((rangeKey) => {
                    const range = dateRanges[rangeKey];

                    return (
                        <optgroup key={rangeKey} label={range.label}>
                            {filterFutureDates(range.rangeOptions, isFutureDatesAllowed, futureDates).map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </optgroup>
                    );
                })}
            </Select>
            {showApply && <Button onClick={onSubmit}>Apply</Button>}
        </div>
    );
};

RelativeDateRange.propTypes = {
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,

    showApply: PropTypes.bool,
    value: PropTypes.string,
    timezoneName: PropTypes.string,
    isFutureDatesAllowed: PropTypes.bool,
};
