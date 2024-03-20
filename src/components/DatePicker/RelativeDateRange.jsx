import PropTypes from "prop-types";
import React from "react";
import { now, toDate } from "../../helpers/date";
import { Button, Select } from "../..";

const options = {
    YESTERDAY: "P1D,yesterday",
    TODAY: "P1D,today",

    LAST_WEEK: "P1W,last week",
    TRAILING_WEEK: "P1W,-1 week",
    THIS_WEEK: "P1W,this week",

    LAST_MONTH: "P1M,first day of last month",
    TRAILING_MONTH: "P1M,-1 month",
    THIS_MONTH: "P1M,first day of this month",

    LAST_QUARTER: "P3M,first day of last quarter",
    TRAILING_QUARTER: "P3M,-3 months",
    THIS_QUARTER: "P3M,first day of this quarter",

    LAST_YEAR: "P1Y,first day of January last year",
    TRAILING_YEAR: "P1Y,-1 year",
    THIS_YEAR: "P1Y,first day of this year",
};

export const dateRanges = {
    day: {
        label: "Day",
        options: [
            {
                value: options.YESTERDAY,
                label: "Yesterday",
            },
            {
                value: options.TODAY,
                label: "Today",
            },
        ],
    },

    week: {
        label: "Week",
        options: [
            {
                value: options.LAST_WEEK,
                label: "Last Week",
            },
            {
                value: options.TRAILING_WEEK,
                label: "Trailing Week",
            },
            {
                value: options.THIS_WEEK,
                label: "This Week",
            },
        ],
    },

    month: {
        label: "Month",
        options: [
            {
                value: options.LAST_MONTH,
                label: "Last Month",
            },
            {
                value: options.TRAILING_MONTH,
                label: "Trailing Month",
            },
            {
                value: options.THIS_MONTH,
                label: "This Month",
            },
        ],
    },

    quarter: {
        label: "Quarter",
        options: [
            {
                value: options.LAST_QUARTER,
                label: "Last Quarter",
            },
            {
                value: options.TRAILING_QUARTER,
                label: "Trailing Quarter",
            },
            {
                value: options.THIS_QUARTER,
                label: "This Quarter",
            },
        ],
    },

    year: {
        label: "Year",
        options: [
            {
                value: options.LAST_YEAR,
                label: "Last Year",
            },
            {
                value: options.TRAILING_YEAR,
                label: "Trailing Year",
            },
            {
                value: options.THIS_YEAR,
                label: "This Year",
            },
        ],
    },
};

const handlers = {
    [options.YESTERDAY]: () => {
        const yesterday = now().subtract(1, "day");
        return {
            from: toDate(yesterday.startOf("day")),
            to: toDate(yesterday.endOf("day"), false),
        };
    },

    [options.TODAY]: () => {
        return {
            from: toDate(now().startOf("day")),
            to: toDate(now().endOf("day"), false),
        };
    },

    [options.LAST_WEEK]: () => {
        const lastWeek = now().subtract(7, "day");
        return {
            from: toDate(lastWeek.startOf("week")),
            to: toDate(lastWeek.endOf("week"), false),
        };
    },

    [options.TRAILING_WEEK]: () => {
        return {
            from: toDate(now().subtract(7, "day").startOf("day")),
            to: toDate(now().subtract(1, "day").endOf("day"), false),
        };
    },

    [options.THIS_WEEK]: () => {
        return {
            from: toDate(now().startOf("week")),
            to: toDate(now().endOf("week"), false),
        };
    },

    [options.LAST_MONTH]: () => {
        const lastMonth = now().subtract(1, "month");
        return {
            from: toDate(lastMonth.startOf("month")),
            to: toDate(lastMonth.endOf("month"), false),
        };
    },

    [options.TRAILING_MONTH]: () => {
        return {
            from: toDate(now().subtract(1, "month").startOf("day")),
            to: toDate(now().subtract(1, "day").endOf("day"), false),
        };
    },

    [options.THIS_MONTH]: () => ({
        from: toDate(now().startOf("month")),
        to: toDate(now().endOf("month"), false),
    }),

    [options.LAST_QUARTER]: () => {
        return {
            from: toDate(now().startOf("month").subtract(3, "month")),
            to: toDate(now().startOf("month").subtract(1, "day"), false),
        };
    },

    [options.TRAILING_QUARTER]: () => {
        return {
            from: toDate(now().subtract(3, "month").startOf("day")),
            to: toDate(now().subtract(1, "day").endOf("day"), false),
        };
    },

    [options.THIS_QUARTER]: () => {
        return {
            from: toDate(now().startOf("Q")),
            to: toDate(now().endOf("Q"), false),
        };
    },

    [options.LAST_YEAR]: () => {
        const lastYear = now().subtract(1, "year");
        return {
            from: toDate(lastYear.startOf("year")),
            to: toDate(lastYear.endOf("year"), false),
        };
    },

    [options.TRAILING_YEAR]: () => {
        return {
            from: toDate(now().subtract(1, "year").startOf("day")),
            to: toDate(now().subtract(1, "day").endOf("day"), false),
        };
    },

    [options.THIS_YEAR]: () => ({
        from: toDate(now().startOf("year")),
        to: toDate(now().endOf("year"), false),
    }),
};

export const RelativeDateRange = ({
    ranges = ["day", "week", "month", "quarter", "year"],
    value,
    // TODO: Prop name (showApply) doesn't match rule (^(is|has|should)[A-Z]([A-Za-z0-9]?)+)
    showApply = true,
    onChange,
    onSubmit,
}) => {
    const handleChange = (e) => {
        const rangeName = e.target.value;
        const range = handlers[rangeName]();
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
                            {range.options.map((option) => (
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
};
