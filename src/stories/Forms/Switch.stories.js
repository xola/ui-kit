import React, { useState } from "react";

import { Switch } from "../..";

const SwitchStories = {
    primary: true,
    title: "Forms/Switch",
    parameters: {
        docs: {
            description: {
                component: "This is a toggle for situations where you require a better looking boolean form component",
            },
        },
    },
    args: {
        size: "medium",
    },
    argTypes: {
        size: {
            description: "Switch Size",
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
    return <Switch isChecked={checked} size={size} onChange={setChecked} />;
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
    return <Switch disabled isChecked={checked} size={size} onChange={setChecked} />;
};

export default SwitchStories;
