import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { CalendarIcon, DownArrowIcon } from "../..";
import { formatDate } from "../../helpers/date";
import { Input } from "../Forms/Input";
import { Popover } from "../Popover/Popover";
import { DatePicker } from "./DatePicker";

export const DatePickerInput = ({
    inputComponent,
    selectedDate,
    dateFormat = "ddd, MMM DD, YYYY",
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

    const displayElement = React.cloneElement(inputComponent ?? <DefaultInput className={classNames.input} />, {
        readOnly: true,
        size: "medium",
        placeholder: "Select Date",
        value: formatDate(date, dateFormat),
        onClick: toggleVisibility,
    });

    return (
        <Popover
            visible={isVisible}
            maxWidth="900px"
            distance={18}
            className={classNames.popover}
            onClickOutside={toggleVisibility}
        >
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

const DefaultInput = ({ className, ...rest }) => {
    return (
        <div className="relative inline-flex w-48 bg-gray-lighter">
            <div className="absolute inset-0 pl-3 flex items-center pointer-events-none">
                <CalendarIcon className="inline-block" />
            </div>

            <Input className={clsx("w-48 pl-8 cursor-pointer", className)} {...rest} />

            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <DownArrowIcon className="inline-block" />
            </div>
        </div>
    );
};

DefaultInput.propTypes = {
    className: PropTypes.string,
};
