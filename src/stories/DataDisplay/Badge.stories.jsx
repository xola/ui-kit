import React from "react";
import { Badge, BellIcon, BoxIcon, CakeIcon, CashIcon, EditIcon, StackIcon } from "../..";
import { disableFields } from "../helpers";

const BadgeStories = {
    title: "Data Display/Badges",
    component: Badge,
    tags: ["autodocs"],
    args: {
        color: "primary",
        size: "small",
        children: "Open",
    },
    argTypes: {
        ...disableFields(["icon"]),
    },
    parameters: {
        design: {
            name: "Figma",
            type: "figma",
            url: "https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=384%3A60",
        },
    },
};

export const Default = {};

export const WithIcons = {
    render: () => {
        return (
            <div className="grid grid-cols-5 gap-4">
                <Badge color="primary" icon={<StackIcon />}>
                    Primary
                </Badge>
                <Badge color="secondary" icon={<EditIcon />}>
                    Secondary
                </Badge>
                <Badge color="success" icon={<BoxIcon />}>
                    Success
                </Badge>
                <Badge color="warning" icon={<BellIcon />}>
                    Warning
                </Badge>
                <Badge color="caution" icon={<CashIcon />}>
                    Caution
                </Badge>
                <Badge color="danger" icon={<CakeIcon />}>
                    Danger
                </Badge>
                <Badge color="critical" icon={<StackIcon />}>
                    Critical
                </Badge>
            </div>
        );
    },
};

export const Colors = {
    render: () => {
        return (
            <div className="space-x-4">
                <Badge color="primary">Primary</Badge>
                <Badge color="secondary">Secondary</Badge>
                <Badge color="success">Success</Badge>
                <Badge color="warning">Warning</Badge>
                <Badge color="caution">Caution</Badge>
                <Badge color="danger">Danger</Badge>
                <Badge color="problem">Problem</Badge>
                <Badge color="critical">Critical</Badge>
            </div>
        );
    },
};

export const AllSizes = {
    render: () => {
        return (
            <div className="space-x-4">
                <Badge size="small">Small</Badge>

                <Badge size="medium" icon={<StackIcon />}>
                    A Medium One
                </Badge>

                <Badge size="large" icon={<EditIcon />}>
                    A Large One
                </Badge>
            </div>
        );
    },
};

export default BadgeStories;
