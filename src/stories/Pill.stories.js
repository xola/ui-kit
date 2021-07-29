import React from "react";
import { StackIcon, EditIcon, BoxIcon, Pill } from "..";

const PillStories = {
    id: "Pill",
    title: "Data Display/Pill",
    component: Pill,
    args: {
        color: "primary",
        size: "medium",
    },
    argTypes: {
        color: {
            options: ["primary", "secondary", "success", "warning", "danger", "caution"],
            control: { type: "select" },
        },
        size: {
            options: ["medium"],
            control: { type: "radio" },
        },
    },
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component: "Show an icon with a particular number",
            },
        },
    },
};

export const Default = () => {
    return (
        <div className="space-x-4">
            <Pill color="danger" icon={<StackIcon />}>
                $ 1,200.34
            </Pill>
            <Pill color="warning" icon={<EditIcon />}>
                1
            </Pill>
            <Pill color="success" icon={<BoxIcon />}>
                Hello World
            </Pill>
        </div>
    );
};

export default PillStories;
