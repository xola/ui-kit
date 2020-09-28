import { PhoneInput, FormInput } from "..";
import React, { useState } from "react";

export default {
    title: "PhoneInput",
};

export const Default = () => {
    const [value, setValue] = useState("");
    return <PhoneInput onChange={setValue} value={value} />;
};

export const WithFormInput = () => {
    const [value, setValue] = useState("");

    return (
        <FormInput label="Select Country">
            <PhoneInput onChange={setValue} value={value} />
        </FormInput>
    );
};
