import React from "react";
import { Select, Label, FormGroup } from "../..";

const SelectStories = {
    primary: true,
    title: "Forms/Select",
};

export const Default = () => {
    return (
        <FormGroup>
            <Label>Text</Label>

            <Select isNative>
                <option value={1}>One</option>
                <option value={2}>Two</option>
                <option value={3}>Three</option>
            </Select>
        </FormGroup>
    );
};

export const Sizes = () => {
    return (
        <div>
            <FormGroup>
                <Label>Small</Label>

                <Select size="small" isNative>
                    <option value={1}>One</option>
                    <option value={2}>Two</option>
                    <option value={3}>Three</option>
                </Select>
            </FormGroup>

            <FormGroup>
                <Label>Medium</Label>

                <Select size="medium" isNative>
                    <option value={1}>One</option>
                    <option value={2}>Two</option>
                    <option value={3}>Three</option>
                </Select>
            </FormGroup>

            <FormGroup>
                <Label>Large</Label>

                <Select size="large" isNative>
                    <option value={1}>One</option>
                    <option value={2}>Two</option>
                    <option value={3}>Three</option>
                </Select>
            </FormGroup>
        </div>
    );
};

export const Disabled = () => {
    return (
        <FormGroup>
            <Label>Disabled</Label>

            <Select disabled isNative value={1}>
                <option value={1}>One</option>
                <option value={2}>Two</option>
                <option value={3}>Three</option>
            </Select>
        </FormGroup>
    );
};

export const WithError = () => {
    return (
        <FormGroup>
            <Label className="text-danger">Text is invalid</Label>

            <Select isNative isError>
                <option value={1}>One</option>
                <option value={2}>Two</option>
                <option value={3}>Three</option>
            </Select>
        </FormGroup>
    );
};

export const CustomWidth = () => {
    return (
        <FormGroup>
            <Label>Text</Label>

            <Select isNative className="!w-60">
                <option value={1}>One</option>
                <option value={2}>Two</option>
                <option value={3}>Three</option>
            </Select>
        </FormGroup>
    );
};

export default SelectStories;
