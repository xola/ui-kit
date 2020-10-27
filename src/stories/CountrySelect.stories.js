import { CountrySelect, FormInput } from "..";
import React from "react";

export default {
    title: "CountrySelect",
};

export const Default = () => {
    return <CountrySelect />;
};

export const WithFormInput = () => {
    return (
        <FormInput label="Select Country">
            <CountrySelect />
        </FormInput>
    );
};
