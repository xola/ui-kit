import React from "react";
import { FormGroup, Label, RangeSlider } from "../..";

const RangeSliderStories = {
    primary: true,
    title: "Forms & Fields/RangeSlider",
};

export const Default = () => {
    const values = [10, 30];

    return (
        <FormGroup>
            <Label>Default</Label>
            <RangeSlider shouldConnectHandles values={values} min={0} max={50} tooltipSuffix="%" />
        </FormGroup>
    );
};

export const MultipleInput = () => {
    const values = [3, 10, 15];

    return (
        <FormGroup>
            <Label>Select Days</Label>

            <RangeSlider values={values} min={0} max={31} tooltipSuffix=" days" />
        </FormGroup>
    );
};

export default RangeSliderStories;
