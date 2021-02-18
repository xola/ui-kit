import React from "react";
import { TimePicker } from "../../../";
import styles from "./TimeSlotSelector.module.scss";
import _ from "lodash";

const TimeSlotSelector = (props) => {
    const initialDisplayCount = 4;
    let selectedValues;

    const addEmptySlot = () => {
        let undefinedCount = [...props.values].filter((v) => !v).length;
        if (undefinedCount === 0) {
            selectedValues.push(null);
        }
    };

    const handleChange = (value, index) => {
        let currentValues = [...selectedValues];
        currentValues[index] = value;
        props.onChange(currentValues, props.name);
        addEmptySlot();
    };

    const deleteTimeSlot = (index) => {
        let currentValues = [...selectedValues].filter((v, i) => i !== index);
        props.onChange(currentValues, props.name);
    };

    if (props.values && _.isArray(props.values) && props.values.length > 0) {
        selectedValues = props.values;
        addEmptySlot();
    } else {
        selectedValues = new Array(initialDisplayCount).fill(null);
    }

    return (
        <div className="form-check-inline">
            {selectedValues.map((selectedValue, index) => (
                <div className={styles.slotpicker} key={index} id={`timeslot-${index}`}>
                    <span onClick={() => deleteTimeSlot(index)} className={styles["clear-button"]}>
                        &times;
                    </span>
                    <TimePicker value={selectedValue} onChange={(v) => handleChange(v, index)} />
                </div>
            ))}
        </div>
    );
};

export default TimeSlotSelector;
