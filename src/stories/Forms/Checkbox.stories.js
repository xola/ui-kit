import React, { useState } from "react";
import { Checkbox } from "../..";

const CheckboxStories = {
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
    return <Checkbox label="Checkbox" checked={checked} onChange={(event_) => setChecked(event_.target.checked)} />;
};

export const Disabled = () => {
    return (
        <div className="space-y-3">
            <Checkbox checked disabled label="Checkbox" />
            <Checkbox disabled label="Checkbox" />
        </div>
    );
};

export default CheckboxStories;
