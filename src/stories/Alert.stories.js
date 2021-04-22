import React from "react";
import { Alert } from "..";

export default {
    title: "Components/Alert",
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
            options: ["primary", "secondary", "success", "warning", "danger", "danger-secondary"],
            control: { type: "select" },
            table: {
                type: { summary: null },
                defaultValue: { summary: "primary" },
            },
        }
    },
};

export const Default = ({ className, color, text = "Default" }) => {
    return (
        <div className="space-x-4">
            <Alert className={className} color={color}>
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
            <Alert color="danger-secondary">Danger Secondary</Alert>
        </div>
    );
};
