import React from "react";
import { useState } from "react";
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

export const Default = ({ size }) => {
    const [checked, setChecked] = useState(false);
    return <Switch checked={checked} onChange={setChecked} size={size} />;
};

export const WithLabel = () => {
    return (
        <Switch.Group>
            <Switch.Label direction="left">Hello World</Switch.Label>
            <Switch size="small" />
        </Switch.Group>
    );
};

export const Disabled = ({ size }) => {
    const [checked, setChecked] = useState(false);
    return <Switch checked={checked} onChange={setChecked} disabled size={size} />;
};
