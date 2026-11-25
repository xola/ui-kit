import React, { useState } from "react";
import { expect, fn, spyOn } from "storybook/test";
import { Button, FormGroup, Label, RangeSlider } from "../..";

const RangeSliderStories = {
    primary: true,
    title: "Forms & Fields/RangeSlider",
};

const getThumbs = (canvasElement) => [...canvasElement.querySelectorAll("[role=slider]")];

const getThumbValues = (canvasElement) => getThumbs(canvasElement).map((thumb) => thumb.getAttribute("aria-valuenow"));

const getTooltips = (canvasElement) => {
    const tooltips = canvasElement.querySelectorAll(".ui-range-slider-tooltip");

    return [...tooltips].map((tooltip) => tooltip.textContent);
};

const onDefaultChange = fn();

export const Default = () => {
    const values = [10, 30];

    return (
        <FormGroup>
            <Label>Default</Label>
            <RangeSlider
                shouldConnectHandles
                values={values}
                min={0}
                max={50}
                tooltipSuffix="%"
                onChange={onDefaultChange}
            />
        </FormGroup>
    );
};

Default.play = async ({ canvasElement, userEvent }) => {
    onDefaultChange.mockClear();
    const thumbs = getThumbs(canvasElement);

    await expect(thumbs).toHaveLength(2);
    await expect(getTooltips(canvasElement)).toEqual(["10%", "30%"]);

    thumbs[0].focus();
    await userEvent.keyboard("{ArrowRight}");

    await expect(getTooltips(canvasElement)).toEqual(["11%", "30%"]);
    await expect(onDefaultChange).toHaveBeenCalledTimes(1);
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
    await expect(getThumbs(canvasElement)).toHaveLength(3);
    await expect(getTooltips(canvasElement)).toEqual(["3 days", "10 days", "15 days"]);
};

export const MultipleHandlesPlacement = () => {
    const values = [10, 20, 30];

    return (
        <FormGroup>
            <Label>Placement per handle</Label>
            <div className="py-12">
                <RangeSlider values={values} min={0} max={50} tooltipPlacement={["bottom", "top", "bottom"]} />
            </div>
        </FormGroup>
    );
};

MultipleHandlesPlacement.play = async ({ canvasElement }) => {
    const thumbs = getThumbs(canvasElement);
    const tooltips = canvasElement.querySelectorAll(".ui-range-slider-tooltip");

    await expect(tooltips).toHaveLength(3);

    const [first, middle, last] = [...tooltips].map((tooltip, index) => {
        return { tooltip: tooltip.getBoundingClientRect(), thumb: thumbs[index].getBoundingClientRect() };
    });

    await expect(first.tooltip.top).toBeGreaterThanOrEqual(first.thumb.bottom);
    await expect(middle.tooltip.bottom).toBeLessThanOrEqual(middle.thumb.top);
    await expect(last.tooltip.top).toBeGreaterThanOrEqual(last.thumb.bottom);
};

export const FormatTooltip = () => {
    const values = [10, 30];
    const formatTooltip = (value, index) => `${index}:${value}`;

    return (
        <FormGroup>
            <Label>Custom tooltip format</Label>
            <RangeSlider values={values} min={0} max={50} formatTooltip={formatTooltip} />
        </FormGroup>
    );
};

FormatTooltip.play = async ({ canvasElement }) => {
    await expect(getTooltips(canvasElement)).toEqual(["0:10", "1:30"]);
};

const onNumbersChange = fn();

export const OnChangeNumbers = () => {
    const values = [10];

    return (
        <FormGroup>
            <Label>onChange receives numbers</Label>
            <RangeSlider values={values} min={0} max={50} onChange={onNumbersChange} />
        </FormGroup>
    );
};

OnChangeNumbers.play = async ({ canvasElement, userEvent }) => {
    onNumbersChange.mockClear();

    getThumbs(canvasElement)[0].focus();
    await userEvent.keyboard("{ArrowRight}");

    await expect(onNumbersChange).toHaveBeenCalledTimes(1);
    await expect(onNumbersChange).toHaveBeenCalledWith([11]);
};

const onDisabledChange = fn();

export const Disabled = () => {
    const values = [10, 30];

    return (
        <FormGroup>
            <Label>Disabled</Label>
            <RangeSlider isDisabled shouldConnectHandles values={values} min={0} max={50} onChange={onDisabledChange} />
        </FormGroup>
    );
};

Disabled.play = async ({ canvasElement, userEvent }) => {
    onDisabledChange.mockClear();

    getThumbs(canvasElement)[0].focus();
    await userEvent.keyboard("{ArrowRight}");

    await expect(getTooltips(canvasElement)).toEqual(["10", "30"]);
    await expect(onDisabledChange).not.toHaveBeenCalled();
};

const onValuesChange = fn();

export const ValuesChange = () => {
    const [values, setValues] = useState([10, 30]);
    const handleSetNewValues = () => setValues([20, 40]);
    const handleSetEqualValues = () => setValues([...values]);

    return (
        <FormGroup>
            <Label>Semi-controlled values</Label>
            <RangeSlider shouldConnectHandles values={values} min={0} max={50} onChange={onValuesChange} />
            <div className="mt-12 flex gap-2">
                <Button onClick={handleSetNewValues}>Set new values</Button>
                <Button onClick={handleSetEqualValues}>Set equal values</Button>
            </div>
        </FormGroup>
    );
};

ValuesChange.play = async ({ canvas, canvasElement, userEvent }) => {
    onValuesChange.mockClear();

    getThumbs(canvasElement)[0].focus();
    await userEvent.keyboard("{ArrowRight}");
    await expect(getTooltips(canvasElement)).toEqual(["11", "30"]);

    await userEvent.click(canvas.getByRole("button", { name: "Set equal values" }));
    await expect(getTooltips(canvasElement)).toEqual(["11", "30"]);

    await userEvent.click(canvas.getByRole("button", { name: "Set new values" }));
    await expect(getTooltips(canvasElement)).toEqual(["20", "40"]);
    await expect(getThumbValues(canvasElement)).toEqual(["20", "40"]);

    await expect(onValuesChange).toHaveBeenCalledTimes(1);
};

const onOutOfRangeChange = fn();

export const OutOfRange = () => {
    const values = [-5, 120];

    return (
        <FormGroup>
            <Label>Values outside the range clamp</Label>
            <RangeSlider values={values} min={0} max={100} onChange={onOutOfRangeChange} />
        </FormGroup>
    );
};

OutOfRange.play = async ({ canvasElement, userEvent }) => {
    onOutOfRangeChange.mockClear();
    const thumbs = getThumbs(canvasElement);

    await expect(getTooltips(canvasElement)).toEqual(["0", "100"]);
    await expect(getThumbValues(canvasElement)).toEqual(["0", "100"]);

    thumbs[0].focus();
    await userEvent.keyboard("{ArrowRight}");

    await expect(onOutOfRangeChange).toHaveBeenCalledWith([1, 100]);
};

let warnSpy;

export const RemovedPropWarns = () => {
    const values = [10, 30];
    const tooltipCustomFormatter = (value) => `${value}`;

    return (
        <FormGroup>
            <Label>Removed tooltipCustomFormatter warns</Label>
            <RangeSlider values={values} min={0} max={50} tooltipCustomFormatter={tooltipCustomFormatter} />
        </FormGroup>
    );
};

RemovedPropWarns.beforeEach = () => {
    warnSpy = spyOn(console, "warn");
};

RemovedPropWarns.play = async () => {
    const message =
        "UI Kit RangeSlider: 'tooltipCustomFormatter' was removed in 3.8, use 'formatTooltip(value, index)'";
    const warnings = warnSpy.mock.calls.filter(([text]) => text === message);

    await expect(warnings).toHaveLength(1);
};

export default RangeSliderStories;
