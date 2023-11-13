import React, { useState } from "react";
import { Checkbox } from "../..";

const CheckboxStories = {
    primary: true,
    title: "Forms & Fields/Checkbox",
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: "Native browser checkbox component with some styling",
            },
        },
        design: {
            name: "Figma",
            type: "figma",
            url: "https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=7683%3A483048&viewport=7074%2C-1137%2C0.4",
        },
    },
};

export const Default = {
    render: () => {
        const [checked, setChecked] = useState(false);
        return <Checkbox label="Checkbox" checked={checked} onChange={(event_) => setChecked(event_.target.checked)} />;
    },
};

export const Disabled = {
    render: () => {
        return (
            <div className="space-y-3">
                <Checkbox checked disabled label="Checkbox" />
                <Checkbox disabled label="Checkbox" />
            </div>
        );
    },
};

export default CheckboxStories;
