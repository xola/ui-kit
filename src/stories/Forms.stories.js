import React from "react";
import { CustomInput, FormGroup, Input, Label } from "..";

export default {
    title: "Form",
};

export const Default = () => {
    return (
        <FormGroup>
            <Label>Name</Label>
            <Input />
        </FormGroup>
    );
};

export const Checkboxes = () => {
    return (
        <div>
            <FormGroup check>
                <Label check>
                    <Input type="checkbox" /> Native
                </Label>
            </FormGroup>

            <CustomInput type="checkbox" id="checkbox-example" label="Custom" />
        </div>
    );
};

export const Radios = () => {
    return (
        <div>
            <FormGroup check>
                <Label check>
                    <Input type="radio" /> Native
                </Label>
            </FormGroup>

            <CustomInput type="radio" id="radio-example" label="Custom" />
        </div>
    );
};
