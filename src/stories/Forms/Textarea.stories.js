import React from "react";
import { Textarea, Label, FormGroup } from "../..";

const TextareaStories = {
    primary: true,
    title: "Forms/Textarea",
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

export default TextareaStories;
