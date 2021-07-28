import React from "react";
import { Input, Label, FormGroup } from "../..";

const InputStories = {
    primary: true,
    title: "Forms/Input",
};

export const Default = () => {
    return (
        <FormGroup>
            <Label>Text</Label>
            <Input />
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
            <Label>ID</Label>
            <Input disabled value="f003e8a95139cd7b70999070838561e0" />
        </FormGroup>
    );
};

export const WithError = () => {
    return (
        <FormGroup>
            <Label className="text-danger">Text is invalid</Label>
            <Input isError />
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

export const Textarea = () => {
    return <Input as="textarea" rows={5} />;
};

export default InputStories;
