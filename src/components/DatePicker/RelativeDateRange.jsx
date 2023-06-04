import dayjs from "dayjs";
import PropTypes from "prop-types";
import React from "react";
import { Button, Select } from "../..";

const options = {
    YESTERDAY: "P1D,last",
    TODAY: "P1D,current",

    LAST_WEEK: "P1W,last",
    TRAILING_WEEK: "P1W,trailing",
    THIS_WEEK: "P1W,current",

    LAST_MONTH: "P1M,last",
    TRAILING_MONTH: "P1M,trailing",
    THIS_MONTH: "P1M,current",

    LAST_QUARTER: "P3M,last",
    TRAILING_QUARTER: "P3M,trailing",
    THIS_QUARTER: "P3M,current",

    LAST_YEAR: "P1Y,last",
    TRAILING_YEAR: "P1Y,trailing",
    THIS_YEAR: "P1Y,current",
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
        const yesterday = dayjs().subtract(1, "day");
        return {
            from: yesterday.startOf("day").toDate(),
            to: yesterday.endOf("day").toDate(),
        };
    },

    [options.TODAY]: () => ({
        from: dayjs().startOf("day").toDate(),
        to: dayjs().endOf("day").toDate(),
    }),

    [options.LAST_WEEK]: () => {
        const lastWeek = dayjs().subtract(7, "day");
        return {
            from: lastWeek.startOf("week").toDate(),
            to: lastWeek.endOf("week").toDate(),
        };
    },

    [options.TRAILING_WEEK]: () => {
        return {
            from: dayjs().subtract(7, "day").startOf("dat").toDate(),
            to: dayjs().subtract(1, "day").endOf("day").toDate(),
        };
    },

    [options.THIS_WEEK]: () => ({
        from: dayjs().startOf("week").toDate(),
        to: dayjs().endOf("week").toDate(),
    }),

    [options.LAST_MONTH]: () => {
        const lastMonth = dayjs().subtract(1, "month");
        return {
            from: lastMonth.startOf("month").toDate(),
            to: lastMonth.endOf("month").toDate(),
        };
    },

    [options.TRAILING_MONTH]: () => {
        return {
            from: dayjs().subtract(1, "month").startOf("day").toDate(),
            to: dayjs().subtract(1, "day").endOf("day").toDate(),
        };
    },

    [options.THIS_MONTH]: () => ({
        from: dayjs().startOf("month").toDate(),
        to: dayjs().endOf("month").toDate(),
    }),

    [options.LAST_QUARTER]: () => {
        return {
            from: dayjs().startOf("month").subtract(3, "month").toDate(),
            to: dayjs().startOf("month").subtract(1, "day").toDate(),
        };
    },

    [options.TRAILING_QUARTER]: () => {
        return {
            from: dayjs().subtract(3, "month").startOf("day").toDate(),
            to: dayjs().subtract(1, "day").endOf("day").toDate(),
        };
    },

    [options.THIS_QUARTER]: () => {
        return {
            from: dayjs().startOf("Q").toDate(),
            to: dayjs().endOf("Q").toDate(),
        };
    },

    [options.LAST_YEAR]: () => {
        const lastYear = dayjs().subtract(1, "year");
        return {
            from: lastYear.startOf("year").toDate(),
            to: lastYear.endOf("year").toDate(),
        };
    },

    [options.TRAILING_YEAR]: () => {
        return {
            from: dayjs().subtract(1, "year").startOf("day").toDate(),
            to: dayjs().subtract(1, "day").endOf("day").toDate(),
        };
    },

    [options.THIS_YEAR]: () => ({
        from: dayjs().startOf("year").toDate(),
        to: dayjs().endOf("year").toDate(),
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
