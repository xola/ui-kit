import React from "react";
import { StackIcon, EditIcon, BoxIcon, BellIcon, CakeIcon, CashIcon } from "..";
import { Badge } from "..";

export default {
    title: "Components/Badge",
    component: Badge,
    argTypes: {
        text: {
            type: { required: true },
            defaultValue: "Default",
            control: { type: "text" },
        },
        color: {
            defaultValue: "primary",
            options: ["primary", "secondary", "success", "warning", "danger", "danger-secondary"],
            control: { type: "select" },
        },
        size: {
            options: ["small", "large"],
            defaultValue: "small",
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

export const WithIcons = () => {
    return (
        <div className="space-x-4">
            <Badge color="primary" icon={<StackIcon className="inline" />}>
                Icon Badge
            </Badge>
            <Badge color="secondary" icon={<EditIcon className="inline" />}>
                Icon Badge
            </Badge>
            <Badge color="primary" color="success" icon={<BoxIcon className="inline" />}>
                Icon Badge
            </Badge>
            <Badge color="primary" color="warning" icon={<BellIcon className="inline" />}>
                Icon Badge
            </Badge>
            <Badge color="primary" color="danger" icon={<CakeIcon className="inline" />}>
                Icon Badge
            </Badge>
            <Badge color="primary" color="danger-secondary" icon={<CashIcon className="inline" />}>
                Icon Badge
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
            <Badge color="danger-secondary">Danger Secondary</Badge>
        </div>
    );
};

export const AllSizes = () => {
    return (
        <div className="space-x-4">
            <Badge size="small">Small</Badge>
            <Badge size="large">A Large One</Badge>
        </div>
    );
};
