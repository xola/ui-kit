import React, { useState } from "react";
import { SubmitButton } from "../..";

const SubmitButtonStories = {
    title: "Forms & Fields/Buttons/Submit Button",
    component: SubmitButton,
    args: {
        isLoading: false,
        size: "medium",
        color: "primary",
    },
    argTypes: {
        isLoading: {
            control: { type: "boolean" },
            table: {
                defaultValue: { summary: false },
            },
        },
        size: {
            options: ["small", "medium", "large"],
            control: { type: "radio" },
            table: {
                defaultValue: { summary: "medium" },
            },
        },
        color: {
            options: ["primary", "secondary", "success", "warning", "danger"],
            control: { type: "select" },
            table: {
                defaultValue: { summary: "primary" },
            },
        },
    },
};

export const Default = ({ isLoading, ...rest }) => {
    const [showLoading, setShowLoading] = useState(isLoading);
    return (
        <SubmitButton isLoading={showLoading} {...rest} onClick={() => setShowLoading(!showLoading)}>
            Submit
        </SubmitButton>
    );
};

export default SubmitButtonStories;
