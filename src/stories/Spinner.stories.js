import React from "react";
import { Spinner } from "..";

export default {
    title: "Components/Spinner",
    component: Spinner,
    argTypes: {
        color: {
            type: { required: true },
            defaultValue: "standard",
            options: ["standard", "primary", "secondary", "success", "warning", "danger"],
            control: { type: "select" },
            table: {
                type: { summary: null },
                defaultValue: { summary: "standard" },
            },
        },
        size: {
            options: ["small", "medium", "large"],
            control: { type: "select" },
            table: {
                type: { summary: null },
                defaultValue: { summary: "small" },
            },
        },
    },
};

export const Default = (props) => {
    return <Spinner {...props} />;
};

export const Sizes = () => {
    return (
        <div class="space-x-8">
            <Spinner size="small" />
            <Spinner size="medium" />
            <Spinner size="large" />
        </div>
    );
};
