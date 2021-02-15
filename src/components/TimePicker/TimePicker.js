import React, { useState, useRef, useEffect } from "react";
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

const TimePicker = (props) => {
    const { ref, isOpen, setIsOpen } = toggleComponent(false);
    const [value, setValue] = useState(props.value);
    const handleChange = (value) => {
        setValue(value);
        if (props.onChange) {
            props.onChange(value);
        }
    };

    useEffect(() => {
        setValue(props.value);
    }, [props.value]);

    const openPopover = (e, isOpen) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };
    const formatDisplayValue = (value) => {
        if (!value) {
            return "";
        }
        return parseInt(value / 100) + ":" + (value % 100 < 10 ? "0" + (value % 100) : value % 100);
    };

    return (
        <div className={styles.timepicker} ref={ref}>
            <button className={styles["timepicker-btn"]} onClick={(e) => openPopover(e, isOpen)}>
                {formatDisplayValue(value)}
            </button>
            {isOpen && (
                <TimeSlotPopOver
                    value={value}
                    onChange={(value) => handleChange(value)}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </div>
    );
};

export default TimePicker;
