import React from "react";
import { Label, FormGroup, RangeSlider } from "../..";

const RangeSliderStories = {
    primary: true,
    title: "Forms & Fields/RangeSlider",
};

export const Default = () => {
    const values = [10, 30];

    return (
        <FormGroup>
            <Label>Default</Label>
            <RangeSlider shouldConnectHandles values={values} min={0} max={50} toolTipSuffix="%" />
        </FormGroup>
    );
};

export const MultipleInput = () => {
    const values = [3, 10, 15];

    return (
        <FormGroup>
            <Label>Select Days</Label>

            <RangeSlider values={values} min={0} max={31} toolTipSuffix=" days" />
        </FormGroup>
    );
};

export default RangeSliderStories;
