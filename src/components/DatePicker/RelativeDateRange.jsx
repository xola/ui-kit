import PropTypes from "prop-types";
import React from "react";
import { Button, Select } from "../..";
import { now, toDate } from "../../helpers/date";

const options = {
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

export const dateRanges = {
    day: {
        label: "Day",
        options: [
            { value: options.YESTERDAY, label: "Yesterday" },
            { value: options.TODAY, label: "Today" },
            { value: options.NEXT_DAY, label: "Tomorrow" },
        ],
    },

    week: {
        label: "Week",
        options: [
            { value: options.LAST_WEEK, label: "Last Week" },
            { value: options.TRAILING_WEEK, label: "Trailing Week" },
            { value: options.THIS_WEEK, label: "This Week" },
            { value: options.NEXT_WEEK, label: "Next Week" },
            { value: options.LEADING_WEEK, label: "Leading Week" },
        ],
    },

    month: {
        label: "Month",
        options: [
            { value: options.LAST_MONTH, label: "Last Month" },
            { value: options.TRAILING_MONTH, label: "Trailing Month" },
            { value: options.THIS_MONTH, label: "This Month" },
            { value: options.NEXT_MONTH, label: "Next Month" },
            { value: options.LEADING_MONTH, label: "Leading Month" },
        ],
    },

    quarter: {
        label: "Quarter",
        options: [
            { value: options.LAST_QUARTER, label: "Last Quarter" },
            { value: options.TRAILING_QUARTER, label: "Trailing Quarter" },
            { value: options.THIS_QUARTER, label: "This Quarter" },
            { value: options.NEXT_QUARTER, label: "Next Quarter" },
            { value: options.LEADING_QUARTER, label: "Leading Quarter" },
        ],
    },

    year: {
        label: "Year",
        options: [
            { value: options.LAST_YEAR, label: "Last Year" },
            { value: options.TRAILING_YEAR, label: "Trailing Year" },
            { value: options.THIS_YEAR, label: "This Year" },
            { value: options.NEXT_YEAR, label: "Next Year" },
            { value: options.LEADING_YEAR, label: "Leading Year" },
        ],
    },
};

const filterFutureDates = (options, isFutureDatesAllowed, futureDates) => {
    if (!isFutureDatesAllowed) {
        return options.filter((option) => !futureDates.has(option.value));
    }

    return options;
};

// List of future date options
const futureDates = new Set([
    options.NEXT_DAY,
    options.NEXT_WEEK,
    options.NEXT_MONTH,
    options.NEXT_QUARTER,
    options.NEXT_YEAR,
    options.LEADING_WEEK,
    options.LEADING_MONTH,
    options.LEADING_QUARTER,
    options.LEADING_YEAR,
]);

const handlers = {
    [options.YESTERDAY]: (timezone) => {
        const yesterday = now(null, timezone).subtract(1, "day");
        return {
            from: toDate(yesterday.startOf("day")),
            to: toDate(yesterday.endOf("day"), false),
        };
    },

    [options.TODAY]: (timezone) => {
        return {
            from: toDate(now(null, timezone).startOf("day")),
            to: toDate(now(null, timezone).endOf("day"), false),
        };
    },

    [options.NEXT_DAY]: (timezone) => {
        const nextDay = now(null, timezone).add(1, "day");
        return {
            from: toDate(nextDay.startOf("day")),
            to: toDate(nextDay.endOf("day"), false),
        };
    },

    [options.LAST_WEEK]: (timezone) => {
        const lastWeek = now(null, timezone).subtract(7, "day");
        return {
            from: toDate(lastWeek.startOf("week")),
            to: toDate(lastWeek.endOf("week"), false),
        };
    },

    [options.TRAILING_WEEK]: (timezone) => {
        return {
            from: toDate(now(null, timezone).subtract(7, "day").startOf("day")),
            to: toDate(now(null, timezone).subtract(1, "day").endOf("day"), false),
        };
    },

    [options.THIS_WEEK]: (timezone) => {
        return {
            from: toDate(now(null, timezone).startOf("week")),
            to: toDate(now(null, timezone).endOf("week"), false),
        };
    },

    [options.NEXT_WEEK]: (timezone) => {
        const nextWeek = now(null, timezone).add(1, "week");
        return {
            from: toDate(nextWeek.startOf("week")),
            to: toDate(nextWeek.endOf("week"), false),
        };
    },

    [options.LEADING_WEEK]: (timezone) => {
        const today = now(null, timezone);
        return {
            from: toDate(today.startOf("day")),
            to: toDate(today.add(1, "week").subtract(1, "day").endOf("day"), false),
        };
    },

    [options.LAST_MONTH]: (timezone) => {
        const lastMonth = now(null, timezone).subtract(1, "month");
        return {
            from: toDate(lastMonth.startOf("month")),
            to: toDate(lastMonth.endOf("month"), false),
        };
    },

    [options.TRAILING_MONTH]: (timezone) => {
        return {
            from: toDate(now(null, timezone).subtract(1, "month").startOf("day")),
            to: toDate(now(null, timezone).subtract(1, "day").endOf("day"), false),
        };
    },

    [options.THIS_MONTH]: (timezone) => ({
        from: toDate(now(null, timezone).startOf("month")),
        to: toDate(now(null, timezone).endOf("month"), false),
    }),

    [options.NEXT_MONTH]: (timezone) => {
        const nextMonth = now(null, timezone).add(1, "month");
        return {
            from: toDate(nextMonth.startOf("month")),
            to: toDate(nextMonth.endOf("month"), false),
        };
    },

    [options.LEADING_MONTH]: (timezone) => {
        const today = now(null, timezone);
        return {
            from: toDate(today.startOf("day")),
            to: toDate(today.add(1, "month").subtract(1, "day").endOf("day"), false),
        };
    },

    [options.LAST_QUARTER]: (timezone) => {
        return {
            from: toDate(now(null, timezone).startOf("quarter").subtract(3, "month").startOf("month")),
            to: toDate(now(null, timezone).endOf("quarter").subtract(3, "month").endOf("month"), false),
        };
    },

    [options.TRAILING_QUARTER]: (timezone) => {
        return {
            from: toDate(now(null, timezone).subtract(3, "month").startOf("day")),
            to: toDate(now(null, timezone).subtract(1, "day").endOf("day"), false),
        };
    },

    [options.THIS_QUARTER]: (timezone) => {
        return {
            from: toDate(now(null, timezone).startOf("Q")),
            to: toDate(now(null, timezone).endOf("Q"), false),
        };
    },

    [options.NEXT_QUARTER]: (timezone) => {
        const nextQuarter = now(null, timezone).add(1, "quarter");
        return {
            from: toDate(nextQuarter.startOf("quarter")),
            to: toDate(nextQuarter.endOf("quarter"), false),
        };
    },

    [options.LEADING_QUARTER]: (timezone) => {
        const today = now(null, timezone);
        return {
            from: toDate(today.startOf("day")),
            to: toDate(today.add(3, "month").subtract(1, "day").endOf("day"), false), // Сегодня + 3 месяца
        };
    },

    [options.LAST_YEAR]: (timezone) => {
        const lastYear = now(null, timezone).subtract(1, "year");
        return {
            from: toDate(lastYear.startOf("year")),
            to: toDate(lastYear.endOf("year"), false),
        };
    },

    [options.TRAILING_YEAR]: (timezone) => {
        return {
            from: toDate(now(null, timezone).subtract(1, "year").startOf("day")),
            to: toDate(now(null, timezone).subtract(1, "day").endOf("day"), false),
        };
    },

    [options.THIS_YEAR]: (timezone) => ({
        from: toDate(now(null, timezone).startOf("year")),
        to: toDate(now(null, timezone).endOf("year"), false),
    }),

    [options.NEXT_YEAR]: (timezone) => {
        const nextYear = now(null, timezone).add(1, "year");
        return {
            from: toDate(nextYear.startOf("year")),
            to: toDate(nextYear.endOf("year"), false),
        };
    },

    [options.LEADING_YEAR]: (timezone) => {
        const today = now(null, timezone);
        return {
            from: toDate(today.startOf("day")),
            to: toDate(today.add(1, "year").subtract(1, "day").endOf("day"), false), // Сегодня + 1 год
        };
    },
};

export const RelativeDateRange = ({
    ranges = ["day", "week", "month", "quarter", "year"],
    value,
    // TODO: Prop name (showApply) doesn't match rule (^(is|has|should)[A-Z]([A-Za-z0-9]?)+)
    showApply = true,
    onChange,
    onSubmit,
    timezoneName,
    isFutureDatesAllowed = false, // This prop used to be able to select Future Dates in RelativeDateRange,
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
                {ranges.map((rangeKey) => {
                    const range = dateRanges[rangeKey];

                    return (
                        <optgroup key={rangeKey} label={range.label}>
                            {filterFutureDates(range.options, isFutureDatesAllowed, futureDates).map((option) => (
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
    ranges: PropTypes.arrayOf(PropTypes.oneOf(["day", "week", "month", "quarter", "year"])),
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    // eslint-disable-next-line react/boolean-prop-naming
    showApply: PropTypes.bool,
    value: PropTypes.string,
    timezoneName: PropTypes.string,
    isFutureDatesAllowed: PropTypes.bool,
};
