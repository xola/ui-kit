import dayjs from "dayjs";
import { random } from "lodash";
import React, { useState } from "react";
import { DatePicker, DatePickerPopover, theme, Button } from "../..";

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
    },
};

const today = dayjs().set("date", 1).toDate();
const { colors } = theme;

const handleOnChange = (date) => {
    console.log("Got date", date);
};

export const Default = () => {
    const [value, setValue] = useState(new Date());
    return <DatePicker value={value} onChange={setValue} />;
};

export const DisabledDays = () => {
    const [value, setValue] = useState(new Date());

    const disabledDays = [
        // Disable two specific dates
        new Date(today.setDate(14)),
        new Date(today.setDate(2)),
        {
            // All days between these two dates
            after: new Date(today.setDate(18)),
            before: new Date(today.setDate(25)),
        },
        {
            // Disabled all Sundays
            daysOfWeek: [0],
        },
    ];

    return <DatePicker month={today} disabledDays={disabledDays} value={value} onChange={setValue} />;
};

addDescription(
    DisabledDays,
    'Use the `disabledDays` prop to display days with a "disabled" style. You can match a wide range of days by passing one or more [different modifiers](http://react-day-picker.js.org/docs/matching-days) to disabledDays',
);

export const RestrictNavigation = () => {
    const [value, setValue] = useState(new Date());

    return (
        <DatePicker
            value={value}
            month={today}
            fromMonth={today}
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
    const [value, setValue] = useState(new Date());

    const modifiers = {
        thursdays: { daysOfWeek: [4] },
        waitlist: [new Date(today.setDate(18)), new Date(today.setDate(20))],
    };

    const modifiersStyles = {
        thursdays: {
            color: colors.white,
            backgroundColor: colors.blue.light,
        },
        waitlist: {
            color: colors.white,
            backgroundColor: colors.yellow.DEFAULT,
        },
        outside: {
            backgroundColor: colors.white,
        },
    };

    return (
        <div>
            <div className="my-5 text-xl font-semibold">This is a work in progress as designs are not given yet</div>
            <DatePicker
                value={value}
                month={today}
                modifiers={modifiers}
                modifiersStyles={modifiersStyles}
                fromMonth={new Date()}
                onChange={setValue}
            />
        </div>
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
    customContent.push("$" + random(1, 200));
}

customContent[random(1, dayjs().daysInMonth())] = "Please Call/Email";
customContent[random(1, dayjs().daysInMonth())] = "Sold Out";
customContent[random(1, dayjs().daysInMonth())] = "Sold Out";
customContent[random(1, dayjs().daysInMonth())] = "205 spots";

export const WithCustomContent = () => {
    const [value, setValue] = useState(new Date());
    return <DatePicker value={value} getDayContent={(date) => customContent[date]} onChange={setValue} />;
};

addDescription(
    WithCustomContent,
    "**WIP** (pending designs) Add custom content to any day cell for example the maximum price for a specific date",
);

export const DateRange = () => {
    const [value, setValue] = useState({ from: null, to: null });

    return (
        <div className="h-[480px]">
            <DatePicker variant="range" value={value} onChange={setValue} />
        </div>
    );
};

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
        <div className="h-[300px] w-75">
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
        <div className="h-[300px]">
            <DatePickerPopover value={new Date()} dateFormat="DD MMM" onChange={handleOnChange}>
                <div className="p-3 cursor-pointer bg-gray-lighter">Hello, click me to open up a date picker</div>
            </DatePickerPopover>
        </div>
    );
};

export const InputWithCustomContent = () => {
    const [value, setValue] = useState(new Date());
    return (
        <div className="h-[300px]">
            <DatePickerPopover
                value={value}
                getDayContent={(date) => customContent[date]}
                onChange={(date) => setValue(date)}
            />
        </div>
    );
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
                Selected Date <code className="p-1 mr-1 text-sm bg-gray-lighter">onDayClick</code>
                <span className="inline-block pb-3 font-semibold">{dayjs(value).format("ddd, DD MMMM YYYY")}</span>
            </div>
            <div>
                Current Month <code className="p-1 mr-1 text-sm bg-gray-lighter">handleMonthChange</code>
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
