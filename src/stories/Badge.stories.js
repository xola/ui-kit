import React from "react";
import { Badge } from "..";

export default {
    title: "Badge",
    component: Badge,
    argTypes: {
        text: {
            type: { required: false },
            defaultValue: "Default",
            control:{
                type: "text"
            }
        },
        color: {
            type: { required: true },
            defaultValue: "primary",
            control: {
                type: "radio",
                options: ["primary", "secondary", "success", "warning", "danger"],
            },
        },
        size: {
            control: {
                type: "radio",
                options: ["small", "medium", "large"],
            },
        },
    },
};

export const Default = ({ className, color, size, text='Default' }) => {
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
