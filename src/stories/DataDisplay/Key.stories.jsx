import React from "react";
import { Key } from "../..";

const KeyStories = {
    title: "Data Display/Key",
    component: Key,
    tags: ["autodocs"],
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

export const Default = {
    args: { char: "K" },
};

export const MacCommandKey = {
    args: { char: "cmd" },
};

export const SpecialKeys = {
    render: () => {
        return (
            <div className="space-x-3">
                <Key char="shift" />
                <Key char="esc" />
                <Key char="alt" />
                <Key char="enter" />
            </div>
        );
    },
};

export default KeyStories;
