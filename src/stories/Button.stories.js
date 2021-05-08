import React from "react";
import { Button, IconButton } from "..";
import { UserIcon } from "../icons/UserIcon";

export default {
    title: "Components/Button",
    component: Button,
};

export const Default = () => {
    return <Button>Default</Button>;
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

export const WithIconAtStart = () => {
    return (
        <div className="space-x-4">
            <Button iconStart={<UserIcon className="inline" />} size="medium">
                Medium
            </Button>
        </div>
    );
};

export const WithIconAtEnd = () => {
    return (
        <div className="space-x-4">
            <Button iconEnd={<UserIcon className="inline" />} color="success" size="large">
                Large
            </Button>
        </div>
    );
};

export const IconOnly = () => {
    return (
        <div className="space-x-4">
            <IconButton icon={<UserIcon className="inline" />} color="primary" size="small" />
            <IconButton icon={<UserIcon className="inline" />} color="outline" size="medium" />
            <IconButton icon={<UserIcon className="inline" />} color="success" size="large" />
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
