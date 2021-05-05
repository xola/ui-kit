import React from "react";
import { Spinner } from "..";

export default {
    title: "Components/Spinner",
    component: Spinner,
    argTypes: {
        color: {
            type: { required: true },
            defaultValue: "secondary",
            options: ["primary", "secondary", "success", "warning", "danger", "caution", "current"],
            control: { type: "select" },
            table: {
                type: { summary: null },
                defaultValue: { summary: "secondary" },
            },
        },
        size: {
            defaultValue: "small",
            options: ["small", "medium", "large", "current"],
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
        <div className="space-x-8">
            <Spinner size="small" />
            <Spinner size="medium" />
            <Spinner size="large" />
        </div>
    );
};
