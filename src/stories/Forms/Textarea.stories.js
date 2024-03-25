import React from "react";
import { FormGroup, Label, Textarea } from "../..";

const TextareaStories = {
    primary: true,
    title: "Forms & Fields/Textarea",
    parameters: {
        design: {
            name: "Figma",
            type: "figma",
            url: "https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=7683%3A479202&viewport=8855%2C-1452%2C0.44",
        },
    },
};

export const Default = () => {
    return (
        <FormGroup>
            <Label>Text</Label>
            <Textarea rows={5} />
        </FormGroup>
    );
};

export const Sizes = () => {
    return (
        <div>
            <FormGroup>
                <Label>Small</Label>
                <Textarea size="small" />
            </FormGroup>

            <FormGroup>
                <Label>Medium</Label>
                <Textarea size="medium" />
            </FormGroup>

            <FormGroup>
                <Label>Large</Label>
                <Textarea size="large" />
            </FormGroup>
        </div>
    );
};

export const Disabled = () => {
    return (
        <FormGroup>
            <Label>ID</Label>
            <Textarea disabled value="f003e8a95139cd7b70999070838561e0" />
        </FormGroup>
    );
};

export const WithError = () => {
    return (
        <FormGroup>
            <Label className="text-danger">Text is invalid</Label>
            <Textarea isError />
        </FormGroup>
    );
};

export const CustomWidth = () => {
    return (
        <FormGroup>
            <Label>Text</Label>
            <Textarea className="!w-60" />
        </FormGroup>
    );
};

export const AutoSize = () => {
    return (
        <FormGroup>
            <Label>Text</Label>
            <Textarea shouldAutoSize={true} />
        </FormGroup>
    );
};

AutoSize.parameters = {
    docs: {
        description: {
            story: "Automatically resize the textarea as the data increases.",
        },
    },
};

export default TextareaStories;
