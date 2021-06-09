import React from "react";
import { useState } from "react";
import { Checkbox } from "../..";

export default {
    primary: true,
    title: "Forms/Checkbox",
    parameters: {
        docs: {
            description: {
                component: "Native browser checkbox component with some styling",
            },
        },
    },
};

export const Default = () => {
    const [checked, setChecked] = useState(false);
    return <Checkbox label="Checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />;
};

export const Disabled = () => {
    return (
        <div className="space-y-3">
            <Checkbox label="Checkbox" checked disabled />
            <Checkbox label="Checkbox" disabled />
        </div>
    );
};
