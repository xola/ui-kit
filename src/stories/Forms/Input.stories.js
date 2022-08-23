import React from "react";
import { FormGroup, Input, Label } from "../..";

const InputStories = {
    primary: true,
    title: "Forms & Fields/Input",
};

export const Default = () => {
    return (
        <FormGroup>
            <Label>Text</Label>
            <Input defaultValue="Hello, World" />
        </FormGroup>
    );
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

export default InputStories;
