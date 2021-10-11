import clsx from "clsx";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { formatDate } from "../../helpers/date";
import { Input } from "../Forms/Input";
import { Popover } from "../Popover/Popover";
import { DatePicker } from "./DatePicker";

export const DatePickerInput = ({
    inputComponent,
    selectedDate,
    handleDayClick,
    handleMonthChange,
    classNames = {},
    ...rest
}) => {
    const [date, setDate] = useState(selectedDate);
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const onChange = (d) => {
        setDate(d);
        handleDayClick?.(d);
        setIsVisible(false);
    };

    const onMonthChange = (m) => {
        handleMonthChange?.(m);
    };

    const displayElement = React.cloneElement(inputComponent ?? <Input />, {
        placeholder: "Select Date",
        size: "small",
        value: formatDate(date, "ddd, MMM DD, YYYY"),
        className: clsx("w-40 cursor-pointer", classNames.input),
        readOnly: true,
        onClick: toggleVisibility,
    });

    return (
        <Popover visible={isVisible} maxWidth="900px" distance={20}>
            {displayElement}
            <Popover.Content>
                <div>
                    <DatePicker
                        value={date}
                        selectedDate={date}
                        month={date}
                        onChange={onChange}
                        onMonthChange={onMonthChange}
                        {...rest}
                    />
                </div>
            </Popover.Content>
        </Popover>
    );
};

DatePickerInput.propTypes = {
    inputComponent: PropTypes.element,
    selectedDate: PropTypes.object,
    handleDayClick: PropTypes.func.isRequired,
    handleMonthChange: PropTypes.func,
    classNames: PropTypes.object,
};
