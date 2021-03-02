import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import { Button } from "reactstrap";
import TimeSlotPopOver from "./TimePickerPopover";
import styles from "./TimePicker.module.scss";

function toggleComponent(initialIsOpen) {
    const [isOpen, setIsOpen] = useState(initialIsOpen);
    const ref = useRef(null);

    const handleHideComponent = (event) => {
        if (event.key === "Escape") {
            setIsOpen(false);
        }
    };

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleHideComponent, true);
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("keydown", handleHideComponent, true);
            document.removeEventListener("click", handleClickOutside, true);
        };
    });

    return { ref, isOpen, setIsOpen };
}

const TimePicker = ({ value, ...rest }) => {
    const { ref, isOpen, setIsOpen } = toggleComponent(false);
    const [selectedValue, setSelectedValue] = useState(value);

    const handleChange = (updatedValue) => {
        setSelectedValue(updatedValue);
        if (rest.onChange) {
            rest.onChange(updatedValue);
        }
    };

    useEffect(() => {
        setSelectedValue(value);
    }, [value]);

    const openPopover = (e, isOpen) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    const formatDisplayValue = (v) => {
        if (!v) {
            return "";
        }
        return parseInt(v / 100) + ":" + (v % 100 < 10 ? "0" + (v % 100) : v % 100);
    };

    return (
        <div className={styles.timePicker} ref={ref}>
            <Button
                className={classNames(styles.button, "p-0 font-14 bg-white rounded text-center")}
                onClick={(e) => openPopover(e, isOpen)}
            >
                {formatDisplayValue(selectedValue)}
            </Button>
            {isOpen && (
                <TimeSlotPopOver
                    value={selectedValue}
                    onChange={(v) => handleChange(v)}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </div>
    );
};

export default TimePicker;
