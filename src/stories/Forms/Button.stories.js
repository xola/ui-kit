import React from "react";
import { Button, EllipsisIcon, KeyIcon, PlusIcon, UserIcon, WaitlistIcon, WarningIcon } from "../..";

const ButtonStories = {
    title: "Forms & Fields/Button",
    component: Button,
    args: {
        as: "button",
        size: "medium",
        color: "primary",
    },
    argTypes: {
        size: {
            options: ["small", "medium", "large"],
            control: { type: "radio" },
            table: {
                defaultValue: { summary: "medium" },
            },
        },
        color: {
            options: ["primary", "secondary", "success", "warning", "danger"],
            control: { type: "select" },
            table: {
                defaultValue: { summary: "primary" },
            },
        },
    },
};

export const Default = (props) => {
    return <Button {...props}>Default</Button>;
};

export const Colors = () => {
    return (
        <div className="space-x-4">
            <Button color="primary">Primary</Button>
            <Button color="secondary">Secondary</Button>
            <Button color="success">Success</Button>
            <Button color="warning">Warning</Button>
            <Button color="danger">Danger</Button>
            <Button color="outline">Outline</Button>
            <Button color="link">Link</Button>
        </div>
    );
};

export const States = () => {
    return <div className="space-x-4" />; // TODO: Disabled & Selected state</div>;
};

export const WithIcons = () => {
    return (
        <div className="space-x-4">
            <Button icon={<UserIcon />} size="medium">
                Medium
            </Button>

            <Button icon={<UserIcon />} iconPlacement="right" color="success" size="large">
                Large
            </Button>
        </div>
    );
};

export const AsLink = () => {
    return (
        <Button as="a" href="https://xola.com" target="_blank" rel="noopener" size="small">
            Xola Website
        </Button>
    );
};

export const FullWidth = () => {
    return (
        <div className="space-y-4 w-60">
            <Button className="w-full">Default</Button>

            <Button icon={<UserIcon />} className="w-full">
                Icon
            </Button>
        </div>
    );
};

export const IconOnly = () => {
    return (
        <div className="space-x-6">
            <Button.Icon color="outline" size="tiny">
                <EllipsisIcon />
            </Button.Icon>

            <Button.Icon color="primary" size="small">
                <KeyIcon />
            </Button.Icon>

            <Button.Icon color="success" size="small">
                <PlusIcon />
            </Button.Icon>

            <Button.Icon color="warning" size="medium">
                <WarningIcon />
            </Button.Icon>

            <Button.Icon color="caution" size="medium">
                <WaitlistIcon />
            </Button.Icon>
        </div>
    );
};

export const Sizes = () => {
    return (
        <div className="space-x-4">
            <Button size="small">Small</Button>
            <Button size="medium">Medium</Button>
            <Button size="large">Large</Button>
        </div>
    );
};

export default ButtonStories;
