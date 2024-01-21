import React, { useState } from "react";
import { CheckIcon, ToggleButton } from "../..";

export default {
    title: "Forms & Fields/ToggleButton",
    component: ToggleButton,
    args: {
        color: "success",
        size: "medium",
        isActive: false,
    },
};

export const Default = ({ size, isActive }) => {
    const [active, setActive] = useState(isActive);
    return (
        <div className="space-y-2">
            <div>Is Active: {active ? "Yes" : "No"}. Click button to toggle</div>
            <div className="flex gap-x-4">
                {["primary", "secondary", "success", "warning", "caution", "danger"].map((color) => {
                    return (
                        <ToggleButton
                            color={color}
                            size={size}
                            isActive={active}
                            className="space-x-2"
                            onClick={() => setActive(!active)}
                        >
                            <CheckIcon className={`text-${color}`} />
                        </ToggleButton>
                    );
                })}
            </div>
        </div>
    );
};
