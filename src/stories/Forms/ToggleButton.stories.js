import React, { useState } from "react";
import { CashIcon, ToggleButton } from "../..";

const ToggleButtonStories = {
    title: "Forms & Fields/Buttons/ToggleButton",
    component: ToggleButton,
    args: {
        color: "primary",
        size: "medium",
        isActive: false,
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

export const Default = ({ color, size }) => {
    const [active, setActive] = useState(false);
    return (
        <div className="space-x-2">
            <ToggleButton
                color={color}
                size={size}
                isActive={active}
                className="space-x-2"
                onClick={() => setActive(true)}
            >
                <CashIcon /> <span>Click to toggle me</span>
            </ToggleButton>
        </div>
    );
};

export default ToggleButtonStories;
