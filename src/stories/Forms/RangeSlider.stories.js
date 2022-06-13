import React, { useState } from "react";
import { Label, FormGroup, RangeSlider } from "../..";

const RangeSliderStories = {
    primary: true,
    title: "Forms & Fields/RangeSlider",
};

export const Default = () => {
    const [values, setValues] = useState([10]);

    return (
        <FormGroup>
            <Label>Default</Label>

            <RangeSlider values={values} min={0} max={50} tooltipLabel="%" onChange={setValues} />
        </FormGroup>
    );
};

export const MinMax = () => {
    const [values, setValues] = useState([15, 60]);

    const knobs = [{ position: 0 }, { position: 25 }, { position: 50 }, { position: 75 }, { position: 100 }];
    return (
        <FormGroup>
            <Label>Select Price Range</Label>

            <RangeSlider values={values} min={0} max={100} knobs={knobs} tooltipLabel=" USD" onChange={setValues} />
        </FormGroup>
    );
};

export const MultipleInput = () => {
    const [values, setValues] = useState([3, 10, 15]);

    return (
        <FormGroup>
            <Label>Select Days</Label>

            <RangeSlider
                values={values}
                min={0}
                max={31}
                tooltipLabel=" days"
                isColoredRailEnabled={false}
                onChange={setValues}
            />
        </FormGroup>
    );
};

export default RangeSliderStories;
