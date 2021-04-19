import React from "react";
import { Alert } from "..";

export default {
    title: "Alert",
    component: Alert,
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
            options: ["primary", "secondary", "success", "warning", "danger"],
            control: { type: "select" },
            table: {
                type: { summary: null },
                defaultValue: { summary: "primary" },
            },
        },
        size: {
            options: ["small", "medium", "large"],
            defaultValue: "medium",
            control: { type: "radio" },
            table: {
                type: { summary: null },
                defaultValue: { summary: "medium" },
            },
        },
    },
};

export const Default = ({ className, color, size, text = "Default" }) => {
    return (
        <div className="space-x-4">
            <Alert className={className} color={color} size={size}>
                {text}
            </Alert>
        </div>
    );
};

export const Colors = () => {
    return (
        <div className="space-y-4">
            <Alert color="primary">Primary</Alert>
            <Alert color="secondary">Secondary</Alert>
            <Alert color="success">Success</Alert>
            <Alert color="warning">Warning</Alert>
            <Alert color="danger">Danger</Alert>
        </div>
    );
};

export const AllSizes = () => {
    return (
        <div className="space-y-4">
            <Alert size="small">Small</Alert>
            <Alert size="medium">Medium</Alert>
            <Alert size="large">Large</Alert>
        </div>
    );
};
