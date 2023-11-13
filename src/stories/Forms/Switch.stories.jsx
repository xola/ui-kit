import React, { useState } from "react";

import { Switch } from "../..";
import { sizeParams } from "../helpers";

const SwitchStories = {
    primary: true,
    title: "Forms & Fields/Switch",
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: "This is a toggle for situations where you require a better looking boolean form component",
            },
        },
        design: {
            name: "Figma",
            type: "figma",
            url: "https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=7683%3A483033&viewport=7074%2C-1137%2C0.4",
        },
    },
    args: {
        size: "medium",
    },
    argTypes: {
        size: sizeParams,
    },
};

export const Default = ({ size = "a" }) => {
    const [checked, setChecked] = useState(false);
    return <Switch isChecked={checked} size={size} onChange={setChecked} />;
};

export const WithLabel = () => {
    const [checked, setChecked] = useState(false);
    return (
        <Switch.Group>
            <Switch.Label direction="left">Hello World</Switch.Label>
            <Switch isChecked={checked} size="small" onChange={setChecked} />
        </Switch.Group>
    );
};

export const Disabled = ({ size }) => {
    const [checked, setChecked] = useState(false);
    return <Switch disabled isChecked={checked} size={size} onChange={setChecked} />;
};

export default SwitchStories;
