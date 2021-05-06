import React from "react";
import { Switch } from "../..";

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
        checked: {
            defaultValue: true,
            description: "If the switch should be enabled",
            control: { type: "boolean" },
            table: {
                type: { summary: null },
                defaultValue: { summary: "true" },
            },
        },
        size: {
            description: "Switch Size",
            defaultValue: "medium",
            table: {
                type: { summary: null },
                defaultValue: { summary: "medium" },
            },
            options: ["small", "medium", "large"],
            control: { type: "radio" },
        },
    },
};

export const Default = ({ checked, size }) => {
    return <Switch checked={checked} size={size} />;
};

export const Small = ({ checked }) => {
    return <Switch checked={checked} size="small" />;
};

export const SwitchWithLabel = () => {
    return (
        <Switch.Group>
            <Switch.Label direction="left">Hello World</Switch.Label>
            <Switch size="small" />
        </Switch.Group>
    );
};
