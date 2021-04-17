import React from "react";
import { Badge } from "..";

export default {
    title: "Badge",
    component: Badge,
    argTypes: {
        text: {
            type: { required: false },
            defaultValue: "Default",
            control: {
                type: "text",
            },
        },
        color: {
            type: { required: true },
            defaultValue: "primary",
            options: ["primary", "secondary", "success", "warning", "danger"],
            control: { type: "radio" },
        },
        size: {
            options: ["small", "medium", "large"],
            control: { type: "radio" },
        },
    },
};

export const Default = ({ className, color, size, text = "Default" }) => {
    return (
        <div className="space-x-4">
            <Badge className={className} color={color} size={size}>
                {text}
            </Badge>
        </div>
    );
};

export const Colors = () => {
    return (
        <div className="space-x-4">
            <Badge color="primary">Primary</Badge>
            <Badge color="secondary">Secondary</Badge>
            <Badge color="success">Success</Badge>
            <Badge color="warning">Warning</Badge>
            <Badge color="danger">Danger</Badge>
        </div>
    );
};

export const AllSizes = () => {
    return (
        <div className="space-x-4">
            <Badge size="small">Small</Badge>
            <Badge size="medium">Medium</Badge>
            <Badge size="large">Large</Badge>
        </div>
    );
};
