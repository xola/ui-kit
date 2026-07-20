import React from "react";
import { expect } from "storybook/test";
import { Key } from "../..";

const KeyStories = {
    title: "Data Display/Key",
    component: Key,
    parameters: {
        docs: {
            description: {
                component: "Display a character as a keyboard key",
            },
        },
    },
    argTypes: {
        char: {
            description: "Character t show",
            type: { required: true },
            control: { type: "text" },
            table: {
                type: { summary: "example: K" },
            },
        },
    },
};

export const Default = ({ char = "K" }) => {
    return <Key char={char} />;
};

Default.play = async ({ canvas }) => {
    await expect(canvas.getByText("K")).toBeInTheDocument();
};

export const MacCommandKey = () => {
    return <Key char="cmd" />;
};

MacCommandKey.play = async ({ canvasElement }) => {
    // cmd maps to "⌘" on macOS and "ctrl" elsewhere, so assert the key renders
    // with content rather than a platform-specific glyph.
    const key = canvasElement.querySelector(".ui-key");
    await expect(key).toBeInTheDocument();
    await expect(key.textContent.trim().length).toBeGreaterThan(0);
};

export const SpecialKeys = () => {
    return (
        <div className="space-x-3">
            <Key char="shift" />
            <Key char="esc" />
            <Key char="alt" />
            <Key char="enter" />
        </div>
    );
};

SpecialKeys.play = async ({ canvas }) => {
    await expect(canvas.getByText("shift")).toBeInTheDocument();
    await expect(canvas.getByText("esc")).toBeInTheDocument();
    await expect(canvas.getByText("alt")).toBeInTheDocument();
    await expect(canvas.getByText("enter")).toBeInTheDocument();
};

export default KeyStories;
