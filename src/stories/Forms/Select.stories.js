import React from "react";
import { FormGroup, Label, Select } from "../..";

const SelectStories = {
    primary: true,
    title: "Forms & Fields/Select",
};

export const Default = () => {
    return (
        <FormGroup>
            <Label>Text</Label>

            <Select>
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

                <Select size="small">
                    <option value={1}>One</option>
                    <option value={2}>Two</option>
                    <option value={3}>Three</option>
                </Select>
            </FormGroup>

            <FormGroup>
                <Label>Medium</Label>

                <Select size="medium">
                    <option value={1}>One</option>
                    <option value={2}>Two</option>
                    <option value={3}>Three</option>
                </Select>
            </FormGroup>

            <FormGroup>
                <Label>Large</Label>

                <Select size="large">
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

            <Select disabled value={1}>
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

            <Select isError>
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

            <Select className="!w-60">
                <option value={1}>One</option>
                <option value={2}>Two</option>
                <option value={3}>Three</option>
            </Select>
        </FormGroup>
    );
};

export default SelectStories;
