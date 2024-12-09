import dayjs from "dayjs";
import React, { useState } from "react";
import { Button, DatePicker, DatePickerPopover, Switch, theme } from "../..";
import { formatDate } from "../../utils/date";

const DatePickerStories = {
    title: "Data Display/Date & Time/Date Picker",
    component: DatePicker,
    parameters: {
        docs: {
            description: {
                component:
                    "Rendering a date picker with various functionality based on [React Day Picker](https://react-day-picker.js.org) library",
            },
        },
        design: {
            name: "Figma",
            type: "figma",
            url: "https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=2746%3A97005",
        },
    },
};

const { colors } = theme;

// We use a fixed date instead of today to avoid flaky tests
const defaultDate = new Date("2022-10-10");
const defaultMonth = dayjs(defaultDate).set("date", 1).toDate();

const handleOnChange = (date) => {
    console.log("Got date", date);
};

const getDaysArrayByMonth = (month) => {
    let daysInMonth = dayjs(month).daysInMonth();
    const arrayDays = [];

    while (daysInMonth) {
        const current = dayjs(month).date(daysInMonth);
        arrayDays.push(current);
        daysInMonth--;
    }

    return arrayDays;
};

export const Default = () => {
    const [value, setValue] = useState(defaultDate);
    return <DatePicker value={value} onChange={setValue} />;
};

export const DisabledDays = () => {
    const [value, setValue] = useState(defaultDate);

    const disabledDays = [
        // Disable two specific dates
        new Date(defaultMonth.setDate(14)),
        new Date(defaultMonth.setDate(2)),
        {
            // All days between these two dates
            after: new Date(defaultMonth.setDate(18)),
            before: new Date(defaultMonth.setDate(23)),
        },
        {
            // Disabled all Sundays
            daysOfWeek: [0],
        },
    ];

    return <DatePicker month={defaultMonth} disabledDays={disabledDays} value={value} onChange={setValue} />;
};

addDescription(
    DisabledDays,
    'Use the `disabledDays` prop to display days with a "disabled" style. You can match a wide range of days by passing one or more [different modifiers](http://react-day-picker.js.org/docs/matching-days) to disabledDays',
);

export const WithFooter = () => {
    const [value, setValue] = useState(defaultDate);
    const [isChecked, setIsChecked] = useState(false);

    return (
        <DatePicker
            month={defaultMonth}
            value={value}
            components={{
                Footer: () => (
                    <div className="px-5 pb-5">
                        <Switch.Group>
                            <Switch isChecked={isChecked} size="large" onChange={() => setIsChecked(!isChecked)} />

                            <Switch.Label direction="right">Switch toggle</Switch.Label>
                        </Switch.Group>
                    </div>
                ),
            }}
            onChange={setValue}
        />
    );
};

addDescription(
    WithFooter,
    "Use the `components` prop to extend DatePicker functionality by passing a react components that will be positioned in the footer are of the component",
);

export const RestrictNavigation = () => {
    const [value, setValue] = useState(defaultDate);

    return (
        <DatePicker
            value={value}
            month={defaultMonth}
            fromMonth={defaultMonth}
            toMonth={dayjs().add(2, "month").toDate()}
            onChange={setValue}
        />
    );
};

addDescription(
    RestrictNavigation,
    "Use the `fromMonth` and `toMonth` props to restrict the navigation between months.",
);

export const ModifyCellStyle = () => {
    const [value, setValue] = useState(defaultDate);

    const modifiers = {
        thursdays: { daysOfWeek: [4] },
        waitlist: [new Date(defaultMonth.setDate(18)), dayjs().set("day", 4).toDate()],
    };

    const modifiersStyles = {
        thursdays: {
            color: colors.primary.darker,
        },
        outside: {
            backgroundColor: colors.white,
        },
    };

    return (
        <DatePicker
            value={value}
            month={defaultMonth}
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
            fromMonth={new Date()}
            onChange={setValue}
        />
    );
};

addDescription(
    ModifyCellStyle,
    "*WIP** (based on design changes of date picker) You can apply a custom inline style to day cells using [modifiers](https://react-day-picker.js.org/docs/matching-days). For example you can style certain cells in the Waitlist yellow.",
);

export const SelectYearMonth = () => {
    const [value, setValue] = useState(new Date());
    return (
        <div className="space-y-2">
            <div>Date: April 21 2023</div>
            <DatePicker shouldShowYearPicker value={value} month={new Date(2023, 3, 21)} onChange={setValue} />
        </div>
    );
};

addDescription(
    SelectYearMonth,
    "This example shows how to use the `month` and `shouldShowYearPicker` prop to change the calendar's caption. For example, we can use these props to start in the month of April and to add a form to switch between months and years.",
);

/**
 * Helper methods for this story
 */

const customContent = [null];
for (let day = 1; day <= dayjs().daysInMonth(); day++) {
    customContent.push(`$${day * 3.5}`);
}

customContent[10] = "Please Call/Email";
customContent[15] = "Sold Out";
customContent[23] = "205 spots";
customContent[22] = "Sold Out";

export const WithCustomContent = () => {
    const [value, setValue] = useState(new Date());
    return <DatePicker value={value} getDayContent={(date) => customContent[date]} onChange={setValue} />;
};

addDescription(
    WithCustomContent,
    "**WIP** (pending designs) Add custom content to any day cell for example the maximum price for a specific date",
);

export const PickerWithInput = () => {
    const [date, setDate] = useState(new Date());
    const disabledDays = [{ daysOfWeek: [0] }]; // Disable all Sunday

    const handleChange = (date, options) => {
        if (!options.disabled) {
            setDate(date);
        }
    };

    const handleClearDateClick = () => {
        setDate(null);
    };

    return (
        <div className="h-75 w-75">
            <div>
                <Button className="mb-4" onClick={handleClearDateClick}>
                    Clear Date
                </Button>
            </div>

            <DatePickerPopover shouldShowYearPicker value={date} disabledDays={disabledDays} onChange={handleChange} />
        </div>
    );
};

addDescription(
    PickerWithInput,
    "The `DatePickerPopover` component binds the DatePicker with an input field, displaying the calendar in a popover",
);

export const PickerCustomInput = () => {
    return (
        <div className="h-75">
            <DatePickerPopover value={new Date()} dateFormat="DD MMM" onChange={handleOnChange}>
                <div className="cursor-pointer bg-gray-lighter p-3">Hello, click me to open up a date picker</div>
            </DatePickerPopover>
        </div>
    );
};

export const InputWithCustomContent = () => {
    const [value, setValue] = useState(new Date());
    return (
        <div className="h-75">
            <DatePickerPopover
                value={value}
                getDayContent={(date) => customContent[date]}
                onChange={(date) => setValue(date)}
            />
        </div>
    );
};

export const DatePickerWithTooltip = () => {
    const [value, setValue] = useState(new Date());
    const [month, setMonth] = useState(dayjs());

    const tooltips = {};
    for (const date of getDaysArrayByMonth(month)) {
        tooltips[formatDate(date)] = { title: customContent[date.get("day")] };
    }

    const getTooltip = (date) => {
        if (tooltips[formatDate(date)]) {
            return tooltips[formatDate(date)].title;
        }
    };

    return <DatePicker getTooltip={getTooltip} value={value} onChange={setValue} onMonthChange={setMonth} />;
};

export const EventHandlers = () => {
    const [value, setValue] = useState(new Date());
    const [month, setMonth] = useState(new Date());

    const handleMonthChange = (newMonth) => {
        setMonth(newMonth);
    };

    const handleChange = (value) => {
        setValue(value);
    };

    return (
        <>
            <div>
                Selected Date <code className="mr-1 bg-gray-lighter p-1 text-sm">onDayClick</code>
                <span className="inline-block pb-3 font-semibold">{dayjs(value).format("ddd, DD MMMM YYYY")}</span>
            </div>
            <div>
                Current Month <code className="mr-1 bg-gray-lighter p-1 text-sm">handleMonthChange</code>
                <span className="inline-block pb-3 font-semibold">{dayjs(month).format("MMMM YYYY")}</span>
            </div>
            <DatePicker value={value} onMonthChange={handleMonthChange} onChange={handleChange} />
        </>
    );
};

addDescription(
    EventHandlers,
    "This shows various useful [event handlers](https://react-day-picker.js.org/api/DayPicker#onBlur) with `DatePicker` ",
);

export const WithUpcomingDates = () => {
    const [value, setValue] = useState(defaultMonth);

    const handleChange = (value) => {
        setValue(value);
    };

    const modifiers = {
        thursdays: { daysOfWeek: [4] },
        waitlist: [new Date(defaultMonth.setDate(18)), dayjs().set("day", 4).toDate()],
    };

    const modifiersStyles = {
        outside: {
            backgroundColor: colors.white,
        },
    };
    const upcomingDates = [
        new Date(2022, 6, 20),
        new Date(2022, 4, 4),
        new Date(2022, 5, 5),
        new Date(2022, 2, 2),
        new Date(2022, 7, 7),
        new Date(2022, 6, 6),
    ];

    return (
        <DatePicker
            value={value}
            upcomingDates={upcomingDates}
            modifiersStyles={modifiersStyles}
            modifiers={modifiers}
            onChange={handleChange}
        />
    );
};

function addDescription(component, description) {
    component.parameters = {
        docs: {
            description: {
                story: description,
            },
        },
    };
}

export default DatePickerStories;
