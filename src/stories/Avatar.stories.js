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
                type: { summary: "example: John Doe" },
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

export const Default = ({ className, name = "John Doe", size }) => {
    return component(className, name, size);
};

export const OneNameLikeCher = ({ className, name = "Cher", size }) => {
    return component(className, name, size);
};

export const TripleNameLikeJScottZ = ({ className, name = "James Scott Zimmerman", size }) => {
    return component(className, name, size);
};

const component = (className, name, size) => <Avatar className={className} name={name} size={size} />;
