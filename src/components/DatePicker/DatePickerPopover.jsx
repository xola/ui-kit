import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { CalendarIcon, DownArrowIcon } from "../..";
import { formatDate } from "../../helpers/date";
import { Input } from "../Forms/Input";
import { Popover } from "../Popover/Popover";
import { DatePicker } from "./DatePicker";

export const DatePickerPopover = ({
    value = new Date(),
    dateFormat = "ddd, LL",
    onChange,
    children,
    classNames = {},
    popoverProps,
    ...rest
}) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const handleChange = (date, options, event) => {
        onChange?.(date, options, event);
        if (!options.disabled) {
            setIsVisible(false);
        }
    };

    const dateProps = {
        size: "medium",
        placeholder: "Select Date",
        value: value ? formatDate(value, dateFormat) : "",
        onClick: toggleVisibility,
    };
    const displayElement = children ? (
        React.cloneElement(children, dateProps)
    ) : (
        <DefaultInput readOnly {...dateProps} />
    );

    return (
        <Popover
            visible={isVisible}
            maxWidth="900px"
            distance={18}
            placement="bottom"
            className={classNames.popover}
            onClickOutside={toggleVisibility}
            {...popoverProps}
        >
            {displayElement}
            <Popover.Content>
                <div>
                    <DatePicker onChange={handleChange} {...rest} />
                </div>
            </Popover.Content>
        </Popover>
    );
};

DatePickerPopover.propTypes = {
    value: PropTypes.objectOf(Date).isRequired,
    dateFormat: PropTypes.string,
    classNames: PropTypes.object,
    popoverProps: PropTypes.object,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

const DefaultInput = ({ className, ...rest }) => {
    return (
        <div className="relative flex bg-gray-lighter">
            <div className="absolute inset-0 flex items-center pl-3 pointer-events-none">
                <CalendarIcon className="inline-block" />
            </div>

            <Input className={clsx("px-8 cursor-pointer", className)} {...rest} />

            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <DownArrowIcon className="inline-block" />
            </div>
        </div>
    );
};

DefaultInput.propTypes = {
    className: PropTypes.string,
};
