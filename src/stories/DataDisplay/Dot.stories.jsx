import React from "react";
import { Dot } from "../..";

const DotStories = {
    title: "Data Display/Dot",
    component: Dot,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: "A simple dot component to act as spacers between various elements",
            },
        },
    },
    argTypes: {
        color: {
            options: ["primary", "secondary", "success", "warning", "danger", "caution"],
            control: { type: "select" },
        },
    },
};

export const Default = {
    args: { color: "primary" },
};

export const AllColors = {
    render: () => {
        return (
            <div className="space-x-4">
                <Dot color="primary" />
                <Dot color="secondary" />
                <Dot color="success" />
                <Dot color="warning" />
                <Dot color="caution" />
                <Dot color="danger" />
            </div>
        );
    },
};

export default DotStories;
