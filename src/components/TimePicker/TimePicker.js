import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import TimeSlotPopOver from "./TimePickerPopover";
import styles from "./TimePicker.module.scss";

const formatValue = (value) => {
    if (_.isNil(value)) {
        return null;
    }

    return parseInt(value / 100) + ":" + (value % 100 < 10 ? "0" + (value % 100) : value % 100);
};

const TimePicker = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value);

    useEffect(() => {
        setSelectedValue(value);
    }, [value]);

    const handleChange = (updatedValue) => {
        setSelectedValue(updatedValue);
        if (onChange) {
            onChange(updatedValue);
        }
    };

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Dropdown isOpen={isOpen} toggle={handleToggle}>
            <DropdownToggle
                color="primary"
                className={classNames(styles.button, "p-0 bg-white rounded text-center")}
                outline
            >
                {formatValue(selectedValue)}
            </DropdownToggle>

            <DropdownMenu className={classNames(styles.dropdownMenu, "p-4")}>
                <TimeSlotPopOver value={selectedValue} onChange={handleChange} onClose={() => setIsOpen(false)} />
            </DropdownMenu>
        </Dropdown>
    );
};

export default TimePicker;
