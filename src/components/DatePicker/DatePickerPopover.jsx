import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { CalendarIcon, DownArrowIcon } from "../..";
import { formatDate } from "../../helpers/date";
import { Input } from "../Forms/Input";
import { Popover } from "../Popover/Popover";
import { DatePicker } from "./DatePicker";

export const DatePickerPopover = ({
    value,
    dateFormat = "ddd, MMM DD, YYYY",
    handleDayClick,
    handleMonthChange,
    children,
    classNames = {},
    popoverProps,
    ...rest
}) => {
    const [date, setDate] = useState(value);
    const [month, setMonth] = useState(value);
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
        setMonth(m);
        handleMonthChange?.(m);
    };

    const displayElement = React.cloneElement(children ?? <DefaultInput className={classNames.input} />, {
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
            placement="bottom"
            onClickOutside={toggleVisibility}
            {...popoverProps}
        >
            {displayElement}
            <Popover.Content>
                <div>
                    <DatePicker
                        value={date}
                        month={month}
                        onChange={onChange}
                        onMonthChange={onMonthChange}
                        {...rest}
                    />
                </div>
            </Popover.Content>
        </Popover>
    );
};

DatePickerPopover.propTypes = {
    inputComponent: PropTypes.element,
    value: PropTypes.object,
    handleDayClick: PropTypes.func.isRequired,
    handleMonthChange: PropTypes.func,
    classNames: PropTypes.object,
    popoverProps: PropTypes.object,
};

const DefaultInput = ({ className, ...rest }) => {
    return (
        <div className="inline-flex relative w-48 bg-gray-lighter">
            <div className="flex absolute inset-0 items-center pl-3 pointer-events-none">
                <CalendarIcon className="inline-block" />
            </div>

            <Input className={clsx("w-48 pl-8 cursor-pointer", className)} {...rest} />

            <div className="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none">
                <DownArrowIcon className="inline-block" />
            </div>
        </div>
    );
};

DefaultInput.propTypes = {
    className: PropTypes.string,
};
