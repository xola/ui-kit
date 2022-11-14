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

export const Default = ({ color, size }) => {
    const [active, setActive] = useState(false);
    return (
        <div className="space-y-2">
            <div>Is Active: {active ? "Yes" : "No"}</div>
            <ToggleButton
                color={color}
                size={size}
                isActive={active}
                className="space-x-2"
                onClick={() => setActive(!active)}
            >
                <CashIcon /> <span>Click to toggle me</span>
            </ToggleButton>
        </div>
    );
};

export default ToggleButtonStories;
