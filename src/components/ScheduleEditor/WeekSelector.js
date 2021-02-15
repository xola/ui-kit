import React, { useState } from "react";
import { FormGroup, Label, Input } from "reactstrap";

const WeekSelector = (props) => {
    const weekConfig = [
        { label: "S", value: 0 },
        { label: "M", value: 1 },
        { label: "T", value: 2 },
        { label: "W", value: 3 },
        { label: "T", value: 4 },
        { label: "F", value: 5 },
        { label: "S", value: 6 },
    ];

    const [values, setValues] = useState(props.selected ? props.selected : []);

    const handleChange = (value) => {
        let selectedValues = [...values];
        let index = selectedValues.indexOf(value);
        if (index >= 0) {
            selectedValues.splice(index, 1);
        } else {
            selectedValues.push(value);
        }
        selectedValues.sort((a, b) => a - b);
        setValues(selectedValues);
        props.onChange(selectedValues, props.name);
    };

    return (
        <div>
            {weekConfig.map((week, index) => {
                return (
                    <FormGroup key={index} check inline>
                        <Label>
                            <Input
                                type="checkbox"
                                name={props.name}
                                value={week.value}
                                checked={values.indexOf(week.value) >= 0}
                                onChange={(e) => handleChange(week.value)}
                            />{" "}
                            {week.label}
                        </Label>
                    </FormGroup>
                );
            })}
        </div>
    );
};

export default WeekSelector;
