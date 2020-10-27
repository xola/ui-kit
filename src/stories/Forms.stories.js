import { Input, FormGroup, Label } from "..";
import React from "react";

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
