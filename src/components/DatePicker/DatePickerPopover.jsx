import PropTypes from "prop-types";
import React, { cloneElement, forwardRef, useRef, useState } from "react";
import cn from "../../helpers/classnames";
import { CalendarIcon, DownArrowIcon } from "../../icons";
import { formatDate } from "../../utils/date";
import { useIsMobile } from "../../hooks/useIsMobile";
import { Input } from "../Forms/Input";
import { Popover } from "../Popover/Popover";
import { DatePicker } from "./DatePicker";
import { MonthPicker } from "./MonthPicker";

export const DatePickerPopover = ({
    value,
    variant = "single",
    dateFormat = "ddd, LL",
    placeholder = "Select Date",
    pickerType = "day",
    onChange,
    children,
    classNames = {},
    components = {},
    popoverProps,
    getDayContent,
    ...rest
}) => {
    const draftStartValue = useRef(value);
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleChange = (date, options, event) => {
        if (variant === "single") {
            onChange?.(date, options, event);
            toggleVisibility();
        } else {
            onChange?.(date, value, options, event);
        }
    };

    const handleSubmitDateRange = () => {
        draftStartValue.current = value;
        onChange?.(value);
        setIsVisible(false);
    };

    /**
     * Radix asks to close on Escape, a press outside and focus leaving; the target's own click opens it. Each way out
     * puts back a half-picked range.
     */
    const handleOpenChange = (isOpen) => {
        if (isOpen) {
            draftStartValue.current = value;
            return;
        }

        if (!value?.to && variant === "range") {
            onChange(draftStartValue.current);
        }

        setIsVisible(false);
    };

    // On mobile the calendar is tall relative to the viewport; opening it downward (below the
    // input) runs it off the bottom of the screen, especially inside a bottom sheet, and worse
    // behind the mobile browser's toolbar. Force it to open upward into the roomier space above the
    // field. This deliberately overrides any consumer-supplied `placement` on mobile only.
    const isMobile = useIsMobile();

    return (
        <Popover
            openOn="click"
            open={isVisible}
            maxWidth={900}
            distance={18}
            placement="bottom"
            className={cn("ui-date-picker-input", classNames.popover)}
            onOpenChange={handleOpenChange}
            {...popoverProps}
            {...(isMobile ? { placement: "top", distance: 4 } : {})}
        >
            {children ? (
                cloneElement(children, { onClick: toggleVisibility })
            ) : (
                <DefaultInput
                    readOnly
                    size="medium"
                    value={value ? formatDate(value, dateFormat) : ""}
                    placeholder={placeholder}
                    className={classNames.input}
                    onClick={toggleVisibility}
                />
            )}

            <Popover.Content className="pr-1">
                {isVisible &&
                    (pickerType === "month" ? (
                        <MonthPicker value={value} onChange={handleChange} {...rest} />
                    ) : (
                        <DatePicker
                            variant={variant}
                            getDayContent={getDayContent}
                            value={value}
                            components={components}
                            onChange={handleChange}
                            onSubmitDateRange={handleSubmitDateRange}
                            {...rest}
                        />
                    ))}
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
                <CalendarIcon className="z-10 inline-block" />
            </div>

            <Input className={cn("no-translate cursor-pointer px-8", className)} {...rest} />

            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <DownArrowIcon className="inline-block" />
            </div>
        </div>
    );
});

DefaultInput.displayName = "DefaultInput";

DefaultInput.propTypes = {
    className: PropTypes.string,
};
