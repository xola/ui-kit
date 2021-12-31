import clsx from "clsx";
import PropTypes from "prop-types";
import React, { cloneElement, forwardRef, useState } from "react";
import { CalendarIcon, DownArrowIcon } from "../..";
import { formatDate } from "../../helpers/date";
import { Input } from "../Forms/Input";
import { Popover } from "../Popover/Popover";
import { DatePicker } from "./DatePicker";

export const DatePickerPopover = ({
    value,
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
            {children ? (
                cloneElement(children, { onClick: toggleVisibility })
            ) : (
                <DefaultInput
                    readOnly
                    size="medium"
                    value={value ? formatDate(value, dateFormat) : ""}
                    onClick={toggleVisibility}
                />
            )}

            <Popover.Content>
                <DatePicker value={value} onChange={handleChange} {...rest} />
            </Popover.Content>
        </Popover>
    );
};

DatePickerPopover.propTypes = {
    ...DatePicker.propTypes,
    dateFormat: PropTypes.string,
    classNames: PropTypes.object,
    popoverProps: PropTypes.object,
    children: PropTypes.node,
};

const DefaultInput = forwardRef(({ className, ...rest }, reference) => {
    return (
        <div ref={reference} className="flex relative bg-gray-lighter">
            <div className="flex absolute inset-0 items-center pl-3 pointer-events-none">
                <CalendarIcon className="inline-block" />
            </div>

            <Input className={clsx("px-8 cursor-pointer", className)} placeholder="Select Date" {...rest} />

            <div className="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none">
                <DownArrowIcon className="inline-block" />
            </div>
        </div>
    );
});

DefaultInput.propTypes = {
    // eslint-disable-next-line react/require-default-props
    className: PropTypes.string,
};
