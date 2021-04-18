import React from "react";
import { Input, Label } from "..";

export default {
    title: "Forms",
};

export const Default = () => {
    return (
        <div>
            <Label>Text</Label>
            <Input />
        </div>
    );
};

export const Disabled = () => {
    return (
        <div>
            <Label>ID</Label>
            <Input value="f003e8a95139cd7b70999070838561e0" disabled />
        </div>
    );
};

export const WithError = () => {
    return (
        <div>
            <Label className="text-danger">Text is invalid</Label>
            <Input error />
        </div>
    );
};

export const CustomWidth = () => {
    return (
        <div>
            <Label>Text</Label>
            <Input className="!w-60" />
        </div>
    );
};
