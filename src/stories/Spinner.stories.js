import React from "react";
import { Spinner } from "..";

const SpinnerStories = {
    title: "Basic/Spinner",
    component: Spinner,
    args: {
        color: "secondary",
        size: "small",
    },
    argTypes: {
        color: {
            type: { required: true },
            options: ["primary", "secondary", "success", "warning", "danger", "caution", "current"],
            control: { type: "select" },
            table: {
                type: { summary: null },
                defaultValue: { summary: "secondary" },
            },
        },
        size: {
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

export default SpinnerStories;
