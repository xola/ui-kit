import React from "react";
import { Input, Label, FormGroup, Switch } from "../..";

export default {
    primary: true,
    title: "Components/Forms/Switch",
    parameters: {
        docs: {
            description: {
                component: "This is a toggle for situations where you require a better looking boolean form component",
            },
        },
    },
    argTypes: {
        size: {
            description: "Switch Size",
            defaultValue: "medium",
            table: {
                type: { summary: null },
                defaultValue: { summary: "medium" },
            },
            options: ["small", "medium"],
            control: { type: "radio" },
        },
    },
};

export const Default = ({ size }) => {
    return <Switch size={size} />;
};

export const Small = () => {
    return <Switch size="small" />;
};

export const SwitchWithLabel = () => {
    return (
        <Switch.Group>
            <Switch.Label direction="left">Hello World</Switch.Label>
            <Switch size="small" />
        </Switch.Group>
    );
};
