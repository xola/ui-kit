import React from "react";
import { expect } from "storybook/test";
import { FormGroup, Input, Label } from "../..";

const InputStories = {
    primary: true,
    title: "Forms & Fields/Input",
    parameters: {
        design: {
            name: "Figma",
            type: "figma",
            url: "https://www.figma.com/file/EFmxLREOeGUse5zksD3iT4/%E2%9A%99%EF%B8%8F-02---DS-Application-UI?node-id=196%3A113261&viewport=-3655%2C339%2C0.3",
        },
    },
};

export const Default = () => {
    return (
        <FormGroup>
            <Label>Text</Label>
            <Input defaultValue="Hello, World" />
        </FormGroup>
    );
};

Default.play = async ({ canvas, userEvent }) => {
    const input = canvas.getByRole("textbox");
    await expect(input).toHaveValue("Hello, World");
    await userEvent.clear(input);
    await userEvent.type(input, "New value");
    await expect(input).toHaveValue("New value");
};

export const Sizes = () => {
    return (
        <div>
            <FormGroup>
                <Label>Small</Label>
                <Input size="small" />
            </FormGroup>

            <FormGroup>
                <Label>Medium</Label>
                <Input size="medium" />
            </FormGroup>

            <FormGroup>
                <Label>Large</Label>
                <Input size="large" />
            </FormGroup>
        </div>
    );
};

export const Disabled = () => {
    return (
        <FormGroup>
            <Label isDisabled>ID</Label>
            <Input disabled defaultValue="f003e8a95139cd7b70999070838561e0" />
        </FormGroup>
    );
};

Sizes.play = async ({ canvas }) => {
    await expect(canvas.getAllByRole("textbox")).toHaveLength(3);
};

Disabled.play = async ({ canvas }) => {
    const input = canvas.getByRole("textbox");
    await expect(input).toBeDisabled();
    await expect(input).toHaveValue("f003e8a95139cd7b70999070838561e0");
};

export const WithError = () => {
    return (
        <FormGroup>
            <Label className="text-danger">Text is invalid</Label>
            <Input isError defaultValue="ui@@@xola.com" />
        </FormGroup>
    );
};

export const WithRequired = () => {
    return (
        <FormGroup>
            <Label>Text</Label>
            <Input isRequired />
        </FormGroup>
    );
};

export const CustomWidth = () => {
    return (
        <FormGroup>
            <Label>Text</Label>
            <Input className="!w-60" />
        </FormGroup>
    );
};

WithRequired.play = async ({ canvas, canvasElement }) => {
    await expect(canvas.getByRole("textbox")).toHaveValue("");
    // isRequired shows a danger dot indicator while the field is empty
    await expect(canvasElement.querySelector(".ui-dot.bg-danger")).toBeInTheDocument();
};

export default InputStories;
