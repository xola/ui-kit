import React from "react";
import { CustomInput } from "reactstrap";

const WeekSelector = ({ value, name, onChange }) => {
    const weekConfig = [
        { label: "S", value: 0 },
        { label: "M", value: 1 },
        { label: "T", value: 2 },
        { label: "W", value: 3 },
        { label: "T", value: 4 },
        { label: "F", value: 5 },
        { label: "S", value: 6 },
    ];

    let values = value ? value : [];

    const handleChange = (value) => {
        let selectedValues = [...values];
        let index = selectedValues.indexOf(value);
        if (index >= 0) {
            selectedValues.splice(index, 1);
        } else {
            selectedValues.push(value);
        }
        selectedValues.sort((a, b) => a - b);
        onChange(selectedValues, name);
    };

    return (
        <div className="d-inline-block float-left w-100 position-relative">
            {weekConfig.map((week, index) => {
                return (
                    <CustomInput
                        inline
                        type="checkbox"
                        name={name}
                        key={index}
                        id={`day-${index}`}
                        label={week.label}
                        value={week.value}
                        checked={values.indexOf(week.value) >= 0}
                        onChange={(e) => handleChange(week.value)}
                    />
                );
            })}
        </div>
    );
};

export default WeekSelector;
