import React from "react";
import { Badge, BellIcon, BoxIcon, CakeIcon, CashIcon, EditIcon, StackIcon } from "../..";

const BadgeStories = {
    title: "Data Display/Badges",
    component: Badge,
    args: {
        text: "Default",
        color: "primary",
        size: "small",
    },
    argTypes: {
        text: {
            type: { required: true },
            control: { type: "text" },
        },
        color: {
            options: ["primary", "secondary", "success", "warning", "danger", "caution"],
            control: { type: "select" },
        },
        size: {
            options: ["small", "large"],
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
            <Badge color="primary" icon={<StackIcon />}>
                Primary Badge
            </Badge>
            <Badge color="secondary" icon={<EditIcon />}>
                Secondary Badge
            </Badge>
            <Badge color="success" icon={<BoxIcon />}>
                Success Badge
            </Badge>
            <Badge color="warning" icon={<BellIcon />}>
                Warning Badge
            </Badge>
            <Badge color="danger" icon={<CakeIcon />}>
                Danger Badge
            </Badge>
            <Badge color="caution" icon={<CashIcon />}>
                Caution Badge
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
            <Badge color="caution">Caution</Badge>
        </div>
    );
};

export const AllSizes = () => {
    return (
        <div className="space-x-4">
            <Badge size="small">Small</Badge>

            <Badge size="large" icon={<StackIcon />}>
                A Large One
            </Badge>
        </div>
    );
};

export default BadgeStories;
