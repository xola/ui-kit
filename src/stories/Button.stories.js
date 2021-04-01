import React from "react";
import { Button } from "..";

export default {
    title: "Button",
    component: Button,
};

export const Default = () => {
    return (
        <div className="space-x-4">
            <Button>Default</Button>
        </div>
    );
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

export const Sizes = () => {
    return (
        <div className="space-x-4">
            <Button size="small">Small</Button>
            <Button size="medium">Medium</Button>
            <Button size="large">Large</Button>
        </div>
    );
};
