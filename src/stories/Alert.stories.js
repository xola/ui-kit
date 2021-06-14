import React from "react";
import { Alert } from "..";

const AlertStories = {
    title: "Components/Alerts & Banners",
    component: Alert,
    parameters: {
        docs: {
            description: {
                component: "Alerts are short one line components whereas banners are multi-line versions of banners",
            },
        },
    },
    argTypes: {
        text: {
            type: { required: false },
            description: "The text in the component",
            defaultValue:
                "Space, the final frontier. These are the voyages of the starship Enterprise. Its five year mission: to explore strange new worlds, to seek out new life and new civilizations, to boldly go where no man has gone before!",
            control: { type: "text" },
            table: {
                type: { summary: "For demo only" },
            },
        },
        color: {
            defaultValue: "primary",
            options: ["primary", "success", "warning", "danger"],
            control: { type: "select" },
            table: {
                type: { summary: null },
                defaultValue: { summary: "primary" },
            },
        },
        shouldClose: {
            defaultValue: false,
            control: { type: "boolean" },
            table: {
                type: { summary: null },
            },
        },
    },
};

export const Default = ({ className, color, shouldClose, text = "Default" }) => {
    return (
        <div className="space-x-4">
            <Alert className={className} color={color} shouldClose={shouldClose}>
                {text}
            </Alert>
        </div>
    );
};

export const Colors = () => {
    return (
        <div className="space-y-4">
            <Alert color="primary">Primary</Alert>
            <Alert color="success">Success</Alert>
            <Alert color="warning">Warning</Alert>
            <Alert color="danger">Danger</Alert>
        </div>
    );
};

export default AlertStories;
