import React from "react";
import { expect } from "storybook/test";
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

Default.play = async ({ canvasElement }) => {
    await expect(canvasElement.querySelectorAll(".noUi-handle")).toHaveLength(2);
    const tooltips = [...canvasElement.querySelectorAll(".noUi-tooltip")].map((tooltip) => tooltip.textContent);
    await expect(tooltips).toEqual(["10%", "30%"]);
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

MultipleInput.play = async ({ canvasElement }) => {
    await expect(canvasElement.querySelectorAll(".noUi-handle")).toHaveLength(3);
};

export default RangeSliderStories;
