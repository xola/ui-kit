import React, { useState } from "react";
import { CheckIcon, ToggleButton } from "../..";

const ToggleButtonStories = {
    title: "Forms & Fields/Buttons/ToggleButton",
    component: ToggleButton,
    args: {
        color: "success",
        size: "medium",
        isActive: false,
    },
    parameters: {
        design: {
            name: "Figma",
            type: "figma",
            url: "https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=7505%3A475117",
        },
    },
    argTypes: {
        size: {
            options: ["small", "medium", "large"],
            control: { type: "radio" },
            table: {
                defaultValue: { summary: "medium" },
            },
        },
        color: {
            options: ["primary", "secondary", "success", "warning", "caution", "danger"],
            control: { type: "select" },
            table: {
                defaultValue: { summary: "primary" },
            },
        },
        isActive: {
            control: { type: "boolean" },
            table: {
                defaultValue: { summary: "false" },
            },
        },
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

export default ToggleButtonStories;
