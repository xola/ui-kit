import React from "react";
import { DotProgress } from "../..";

const DotProgressStories = {
    title: "Data Display/DotProgress",
    component: DotProgress,
    parameters: {
        docs: {
            description: {
                component: "Show the progress of any sequence through dots",
            },
        },
    },
    argTypes: {
        current: {
            type: { required: true },
            description: "The current position. Starts at 0",
            control: { type: "number" },
        },
        total: {
            type: { required: true },
            description: "The total count in progress",
            control: { type: "number" },
        },
    },
};

export const Default = {
    args: { current: 2, total: 6 },
};

export default DotProgressStories;
