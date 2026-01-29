import React, { cloneElement, forwardRef, useEffect, useState } from "react";
import { CalendarIcon, DownArrowIcon } from "../../icons";
import { formatDate } from "../../helpers/date";
import cn from "../../helpers/classnames";
import { Input } from "../Forms/Input";
import { Popover } from "../Popover/Popover";
import type { PopoverProps } from "../Popover/Popover";
import { DatePicker } from "./DatePicker";
import { MonthPicker } from "./MonthPicker";

type DateValue = Date | { from?: Date; to?: Date };
type PickerType = "day" | "month";
type PickerVariant = "single" | "range";

export interface DatePickerPopoverProps {
    [key: string]: any;
    value?: DateValue;
    variant?: PickerVariant;
    dateFormat?: string;
    placeholder?: string;
    pickerType?: PickerType;
    classNames?: {
        popover?: string;
        input?: string;
    };
    components?: {
        Footer?: React.ComponentType;
    };
    popoverProps?: Partial<PopoverProps>;
    children?: React.ReactElement;
    getDayContent?: (day: number, date: Date) => React.ReactNode;
    onChange?: (...arguments_: any[]) => void;
}

export const DatePickerPopover = ({
    value,
    variant = "single",
    dateFormat = "ddd, LL",
    placeholder = "Select Date",
    pickerType = "day",
    classNames = {},
    components = {},
    popoverProps,
    children,
    getDayContent,
    onChange,
    ...rest
}: DatePickerPopoverProps) => {
    const [initialValue] = useState(value);
    const [originalValue, setOriginalValue] = useState(value);
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const handleChange = (date: any, options?: any, event?: any) => {
        if (variant === "single") {
            onChange?.(date, options, event);
            toggleVisibility();
        } else {
            onChange?.(date, originalValue, options, event);
        }
    };

    const handleSubmitDateRange = () => {
        setOriginalValue(value);
        onChange?.(value);
        setIsVisible(false);
    };

    const handleClickOutside = () => {
        if (variant === "range" && value && typeof value === "object" && "to" in value && !value.to) {
            onChange?.(initialValue);
        }

        toggleVisibility();
    };

    useEffect(() => {
        setOriginalValue(value);
    }, [value]);

    return (
        <Popover
            visible={isVisible}
            maxWidth={900}
            distance={18}
            placement="bottom"
            className={cn("ui-date-picker-input", classNames.popover)}
            onClickOutside={handleClickOutside}
            {...popoverProps}
        >
            {children ? (
                cloneElement(children, { onClick: toggleVisibility })
            ) : (
                <DefaultInput
                    readOnly
                    size="medium"
                    value={value ? formatDate(value as any, dateFormat) : ""}
                    placeholder={placeholder}
                    className={classNames?.input}
                    onClick={toggleVisibility}
                />
            )}

            <Popover.Content className="pr-1">
                {isVisible &&
                    (pickerType === "month" ? (
                        <MonthPicker value={value as Date} onChange={handleChange} {...rest} />
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

interface DefaultInputProps {
    [key: string]: any;
    className?: string;
}

const DefaultInput = forwardRef<HTMLDivElement, DefaultInputProps>(({ className, ...rest }, reference) => {
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
