import React from "react";
import { Avatar } from "..";

export default {
    title: "Avatar",
    component: Avatar,
    argTypes: {
        name: {
            description: "A user's full name",
            type: { required: true },
            control: { type: "text" },
            table: {
                type: { summary: "example: John Doe" }
            },
        },
        size: {
            description: "Avatar Size",
            defaultValue: "large",
            table: {
                type: { summary: "one of the options" },
                defaultValue: { summary: "large" },
            },
            control: {
                type: "radio",
                options: ["medium", "large"],
            },
        },
    },
};

export const Default = ({ name = 'John Doe', size }) => {
    return component(name, size);
};

export const OneName = ({ name = 'Cher', size }) => {
    return component(name, size);
};

export const TripleName = ({ name = 'James Scott Zimmerman', size }) => {
    return component(name, size);
};

const component = (name, size) => <Avatar name={name} size={size} />;
