import React from "react";
import _ from "lodash";
import classNames from "classnames";
import { TimePicker } from "../../../";
import styles from "./TimeSlotSelector.module.scss";

const TimeSlotSelector = ({ name, value, ...rest }) => {
    const initialDisplayCount = 4;
    let selectedValues;

    const addEmptySlot = () => {
        let undefinedCount = [...value].filter((v) => !v).length;
        if (undefinedCount === 0) {
            selectedValues.push(null);
        }
    };

    const handleChange = (value, index) => {
        let currentValues = [...selectedValues];
        currentValues[index] = value;
        rest.onChange(currentValues, name);
        addEmptySlot();
    };

    const deleteTimeSlot = (index) => {
        let currentValues = [...selectedValues].filter((v, i) => i !== index);
        rest.onChange(currentValues, name);
    };

    if (value && _.isArray(value) && value.length > 0) {
        selectedValues = value;
        addEmptySlot();
    } else {
        selectedValues = new Array(initialDisplayCount).fill(null);
    }

    return (
        <div>
            {selectedValues.map((selectedValue, index) => (
                <div
                    className={classNames(styles.slot, "position-relative d-inline-block m-1")}
                    key={index}
                    id={`timeslot-${index}`}
                >
                    <span
                        onClick={() => deleteTimeSlot(index)}
                        className={classNames(
                            styles.clearButton,
                            "position-absolute cursor-pointer text-white rounded-circle bg-secondary text-center cursor-pointer",
                        )}
                    >
                        &times;
                    </span>
                    <TimePicker value={selectedValue} onChange={(v) => handleChange(v, index)} />
                </div>
            ))}
        </div>
    );
};

export default TimeSlotSelector;
