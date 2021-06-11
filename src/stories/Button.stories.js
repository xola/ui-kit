import React from "react";
import { Button, UserIcon } from "..";

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

export const IconOnly = () => {
    return (
        <div className="space-x-4">
            <Button.Icon color="primary" size="small">
                <UserIcon className="text-red" />
            </Button.Icon>

            <Button.Icon color="outline" size="medium">
                <UserIcon />
            </Button.Icon>

            <Button.Icon color="success" size="large">
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
