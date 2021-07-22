import React from "react";
import { Button, UserIcon } from "..";

const ButtonStories = {
    title: "Components/Button",
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
        variant: {
            options: ["outline", "link"],
            control: { type: "select" },
            table: {
                defaultValue: { summary: null },
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
        </div>
    );
};

export const OutlineVariants = () => {
    return (
        <div className="space-x-4">
            <Button color="primary" variant="outline">
                Primary
            </Button>
            <Button color="secondary" variant="outline">
                Secondary
            </Button>
            <Button color="success" variant="outline">
                Success
            </Button>
            <Button color="warning" variant="outline">
                Warning
            </Button>
            <Button color="danger" variant="outline">
                Danger
            </Button>
        </div>
    );
};

export const LinkVariants = () => {
    return (
        <div className="space-x-4">
            <Button color="primary" variant="link">
                Primary
            </Button>
            <Button color="secondary" variant="link">
                Secondary
            </Button>
            <Button color="success" variant="link">
                Success
            </Button>
            <Button color="warning" variant="link">
                Warning
            </Button>
            <Button color="danger" variant="link">
                Danger
            </Button>
        </div>
    );
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
        <Button as="a" href="https://xola.com" target="_blank" rel="noopener" size="medium">
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
        <div className="space-x-4">
            <Button.Icon color="primary" size="small">
                <UserIcon />
            </Button.Icon>

            <Button.Icon color="success" size="medium">
                <UserIcon />
            </Button.Icon>

            <Button.Icon color="danger" size="large">
                <UserIcon />
            </Button.Icon>
        </div>
    );
};

export const OutlineIcons = () => {
    return (
        <div className="space-x-4">
            <Button.Icon color="primary" variant="outline" size="medium">
                <UserIcon />
            </Button.Icon>

            <Button.Icon color="secondary" variant="outline" size="medium">
                <UserIcon />
            </Button.Icon>

            <Button.Icon color="success" variant="outline" size="medium">
                <UserIcon />
            </Button.Icon>

            <Button.Icon color="warning" variant="outline" size="medium">
                <UserIcon />
            </Button.Icon>

            <Button.Icon color="danger" variant="outline" size="medium">
                <UserIcon />
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
