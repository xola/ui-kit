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
    variant = "single",
    dateFormat = "ddd, LL",
    onChange,
    children,
    classNames = {},
    popoverProps,
    getDayContent,
    ...rest
}) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const handleChange = (date, options, event) => {
        onChange?.(date, options, event);

        if (!options.disabled && (variant === "single" || (date.from && date.to))) {
            setIsVisible(false);
        }
    };

    return (
        <Popover
            visible={isVisible}
            maxWidth={900}
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
                <DatePicker
                    variant={variant}
                    getDayContent={getDayContent}
                    value={value}
                    onChange={handleChange}
                    {...rest}
                />
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
        <div ref={reference} className="relative flex bg-gray-lighter">
            <div className="pointer-events-none absolute inset-0 flex items-center pl-3">
                <CalendarIcon className="inline-block" />
            </div>

            <Input className={clsx("cursor-pointer px-8", className)} placeholder="Select Date" {...rest} />

            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <DownArrowIcon className="inline-block" />
            </div>
        </div>
    );
});

DefaultInput.propTypes = {
    // eslint-disable-next-line react/require-default-props
    className: PropTypes.string,
};
