import React from "react";
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

export const Default = {
    render: ({ char }) => {
        return <Key char={char} />;
    },
};

export const MacCommandKey = {
    render: (args) => {
        return <Key char="cmd" />;
    },
};

export const SpecialKeys = {
    render: (args) => {
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
