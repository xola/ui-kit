import React from "react";
import { Button, Select } from "../..";
import { now, toDate } from "../../helpers/date";

export const rangeOptions = {
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
} as const;

export const rangeLabels: Record<string, string> = {
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

interface RangeOption {
    value: string;
    label: string;
}

export const dateRanges: Record<string, { label: string; rangeOptions: RangeOption[] }> = {
    day: {
        label: "Day",
        rangeOptions: [
            { value: rangeOptions.YESTERDAY, label: rangeLabels[rangeOptions.YESTERDAY] },
            { value: rangeOptions.TODAY, label: rangeLabels[rangeOptions.TODAY] },
            { value: rangeOptions.NEXT_DAY, label: rangeLabels[rangeOptions.NEXT_DAY] },
        ],
    },

    week: {
        label: "Week",
        rangeOptions: [
            { value: rangeOptions.LAST_WEEK, label: rangeLabels[rangeOptions.LAST_WEEK] },
            { value: rangeOptions.TRAILING_WEEK, label: rangeLabels[rangeOptions.TRAILING_WEEK] },
            { value: rangeOptions.THIS_WEEK, label: rangeLabels[rangeOptions.THIS_WEEK] },
            { value: rangeOptions.NEXT_WEEK, label: rangeLabels[rangeOptions.NEXT_WEEK] },
            { value: rangeOptions.LEADING_WEEK, label: rangeLabels[rangeOptions.LEADING_WEEK] },
        ],
    },

    month: {
        label: "Month",
        rangeOptions: [
            { value: rangeOptions.LAST_MONTH, label: rangeLabels[rangeOptions.LAST_MONTH] },
            { value: rangeOptions.TRAILING_MONTH, label: rangeLabels[rangeOptions.TRAILING_MONTH] },
            { value: rangeOptions.THIS_MONTH, label: rangeLabels[rangeOptions.THIS_MONTH] },
            { value: rangeOptions.NEXT_MONTH, label: rangeLabels[rangeOptions.NEXT_MONTH] },
            { value: rangeOptions.LEADING_MONTH, label: rangeLabels[rangeOptions.LEADING_MONTH] },
        ],
    },

    quarter: {
        label: "Quarter",
        rangeOptions: [
            { value: rangeOptions.LAST_QUARTER, label: rangeLabels[rangeOptions.LAST_QUARTER] },
            { value: rangeOptions.TRAILING_QUARTER, label: rangeLabels[rangeOptions.TRAILING_QUARTER] },
            { value: rangeOptions.THIS_QUARTER, label: rangeLabels[rangeOptions.THIS_QUARTER] },
            { value: rangeOptions.NEXT_QUARTER, label: rangeLabels[rangeOptions.NEXT_QUARTER] },
            { value: rangeOptions.LEADING_QUARTER, label: rangeLabels[rangeOptions.LEADING_QUARTER] },
        ],
    },

    year: {
        label: "Year",
        rangeOptions: [
            { value: rangeOptions.LAST_YEAR, label: rangeLabels[rangeOptions.LAST_YEAR] },
            { value: rangeOptions.TRAILING_YEAR, label: rangeLabels[rangeOptions.TRAILING_YEAR] },
            { value: rangeOptions.THIS_YEAR, label: rangeLabels[rangeOptions.THIS_YEAR] },
            { value: rangeOptions.NEXT_YEAR, label: rangeLabels[rangeOptions.NEXT_YEAR] },
            { value: rangeOptions.LEADING_YEAR, label: rangeLabels[rangeOptions.LEADING_YEAR] },
        ],
    },
};

const filterFutureDates = (rangeOptions: RangeOption[], isFutureDatesAllowed: boolean, futureDates: Set<string>) => {
    if (!isFutureDatesAllowed) {
        return rangeOptions.filter((option) => !futureDates.has(option.value));
    }

    return rangeOptions;
};

// List of future date rangeOptions
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

interface DateRange {
    from: Date;
    to: Date;
}

const handlers: Record<string, (timezone: string | undefined) => DateRange> = {
    [rangeOptions.YESTERDAY]: (timezone) => {
        const yesterday = now(undefined, timezone).subtract(1, "day");
        return {
            from: toDate(yesterday.startOf("day")),
            to: toDate(yesterday.endOf("day"), false),
        };
    },

    [rangeOptions.TODAY]: (timezone) => {
        return {
            from: toDate(now(undefined, timezone).startOf("day")),
            to: toDate(now(undefined, timezone).endOf("day"), false),
        };
    },

    [rangeOptions.NEXT_DAY]: (timezone) => {
        const nextDay = now(undefined, timezone).add(1, "day");
        return {
            from: toDate(nextDay.startOf("day")),
            to: toDate(nextDay.endOf("day"), false),
        };
    },

    [rangeOptions.LAST_WEEK]: (timezone) => {
        const lastWeek = now(undefined, timezone).subtract(7, "day");
        return {
            from: toDate(lastWeek.startOf("week")),
            to: toDate(lastWeek.endOf("week"), false),
        };
    },

    [rangeOptions.TRAILING_WEEK]: (timezone) => {
        return {
            from: toDate(now(undefined, timezone).subtract(7, "day").startOf("day")),
            to: toDate(now(undefined, timezone).subtract(1, "day").endOf("day"), false),
        };
    },

    [rangeOptions.THIS_WEEK]: (timezone) => {
        return {
            from: toDate(now(undefined, timezone).startOf("week")),
            to: toDate(now(undefined, timezone).endOf("week"), false),
        };
    },

    [rangeOptions.NEXT_WEEK]: (timezone) => {
        const nextWeek = now(undefined, timezone).add(1, "week");
        return {
            from: toDate(nextWeek.startOf("week")),
            to: toDate(nextWeek.endOf("week"), false),
        };
    },

    [rangeOptions.LEADING_WEEK]: (timezone) => {
        const today = now(undefined, timezone);
        return {
            from: toDate(today.startOf("day")),
            to: toDate(today.add(1, "week").subtract(1, "day").endOf("day"), false),
        };
    },

    [rangeOptions.LAST_MONTH]: (timezone) => {
        const lastMonth = now(undefined, timezone).subtract(1, "month");
        return {
            from: toDate(lastMonth.startOf("month")),
            to: toDate(lastMonth.endOf("month"), false),
        };
    },

    [rangeOptions.TRAILING_MONTH]: (timezone) => {
        return {
            from: toDate(now(undefined, timezone).subtract(1, "month").startOf("day")),
            to: toDate(now(undefined, timezone).subtract(1, "day").endOf("day"), false),
        };
    },

    [rangeOptions.THIS_MONTH]: (timezone) => ({
        from: toDate(now(undefined, timezone).startOf("month")),
        to: toDate(now(undefined, timezone).endOf("month"), false),
    }),

    [rangeOptions.NEXT_MONTH]: (timezone) => {
        const nextMonth = now(undefined, timezone).add(1, "month");
        return {
            from: toDate(nextMonth.startOf("month")),
            to: toDate(nextMonth.endOf("month"), false),
        };
    },

    [rangeOptions.LEADING_MONTH]: (timezone) => {
        const today = now(undefined, timezone);
        return {
            from: toDate(today.startOf("day")),
            to: toDate(today.add(1, "month").subtract(1, "day").endOf("day"), false),
        };
    },

    [rangeOptions.LAST_QUARTER]: (timezone) => {
        return {
            from: toDate(now(undefined, timezone).startOf("quarter").subtract(3, "month").startOf("month")),
            to: toDate(now(undefined, timezone).endOf("quarter").subtract(3, "month").endOf("month"), false),
        };
    },

    [rangeOptions.TRAILING_QUARTER]: (timezone) => {
        return {
            from: toDate(now(undefined, timezone).subtract(3, "month").startOf("day")),
            to: toDate(now(undefined, timezone).subtract(1, "day").endOf("day"), false),
        };
    },

    [rangeOptions.THIS_QUARTER]: (timezone) => {
        return {
            from: toDate(now(undefined, timezone).startOf("Q")),
            to: toDate(now(undefined, timezone).endOf("Q"), false),
        };
    },

    [rangeOptions.NEXT_QUARTER]: (timezone) => {
        const nextQuarter = now(undefined, timezone).add(1, "quarter");
        return {
            from: toDate(nextQuarter.startOf("quarter")),
            to: toDate(nextQuarter.endOf("quarter"), false),
        };
    },

    [rangeOptions.LEADING_QUARTER]: (timezone) => {
        const today = now(undefined, timezone);
        return {
            from: toDate(today.startOf("day")),
            to: toDate(today.add(3, "month").subtract(1, "day").endOf("day"), false),
        };
    },

    [rangeOptions.LAST_YEAR]: (timezone) => {
        const lastYear = now(undefined, timezone).subtract(1, "year");
        return {
            from: toDate(lastYear.startOf("year")),
            to: toDate(lastYear.endOf("year"), false),
        };
    },

    [rangeOptions.TRAILING_YEAR]: (timezone) => {
        return {
            from: toDate(now(undefined, timezone).subtract(1, "year").startOf("day")),
            to: toDate(now(undefined, timezone).subtract(1, "day").endOf("day"), false),
        };
    },

    [rangeOptions.THIS_YEAR]: (timezone) => ({
        from: toDate(now(undefined, timezone).startOf("year")),
        to: toDate(now(undefined, timezone).endOf("year"), false),
    }),

    [rangeOptions.NEXT_YEAR]: (timezone) => {
        const nextYear = now(undefined, timezone).add(1, "year");
        return {
            from: toDate(nextYear.startOf("year")),
            to: toDate(nextYear.endOf("year"), false),
        };
    },

    [rangeOptions.LEADING_YEAR]: (timezone) => {
        const today = now(undefined, timezone);
        return {
            from: toDate(today.startOf("day")),
            to: toDate(today.add(1, "year").subtract(1, "day").endOf("day"), false),
        };
    },
};

type RangeKey = "day" | "week" | "month" | "quarter" | "year";

export interface RelativeDateRangeProps {
    ranges?: RangeKey[];
    value?: string;
    showApply?: boolean;
    isFutureDatesAllowed?: boolean;
    timezoneName?: string;
    onChange: (rangeName: string, range: DateRange) => void;
    onSubmit?: () => void;
}

export const RelativeDateRange = ({
    ranges = ["day", "week", "month", "quarter", "year"],
    value,
    showApply = true,
    isFutureDatesAllowed = false,
    timezoneName,
    onChange,
    onSubmit,
}: RelativeDateRangeProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
