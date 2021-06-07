import React from "react";
import { Key } from "../..";

export default {
    title: "Typography/Key",
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

export const MacCommandKey = () => {
    return <Key char="cmd" />;
};

export const SpecialKeys = () => {
    return (
        <div class="space-x-3">
            <Key char="shift" />
            <Key char="esc" />
            <Key char="alt" />
            <Key char="enter" />
        </div>
    );
};
