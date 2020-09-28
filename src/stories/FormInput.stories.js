import { FormInput } from "..";
import React from "react";

export default {
    title: "FormInput",
    // component: Input,
};

export const Default = () => {
    return <FormInput label="Name" />;
};

export const WithError = () => {
    return <FormInput label="Name" error="is required and the rest of the message is really long" />;
};

export const Select = () => {
    return (
        <FormInput label="Select Number" type="select">
            <option value="one">One</option>
            <option value="two">Two</option>
            <option value="three">Three</option>
        </FormInput>
    );
};
