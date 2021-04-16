import React from "react";
import { Avatar } from "..";

export default {
    title: "Avatar",
    component: Avatar,
    parameters: {
        docs: {
            description: {
                component: "The avatar component is used to represent a user or seller. If the seller has a profile image that should be used instead",
            },
        },
    },
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
            options: ["small", "medium", "large"],
            control: { type: "radio" },
        },
    },
};

export const Default = ({ className, name = "John Doe", size }) => {
    return <Avatar className={className} name={name} size={size} />;
};

export const OneNameLikeCher = ({ className, name = "Cher", size }) => {
    return <Avatar className={className} name={name} size={size} />;
};

export const ThreeNames = ({ className, name = "James Scott Zimmerman", size }) => {
    return <Avatar className={className} name={name} size={size} />;
};

export const AllSizes = ({ className, name = "John Doe" }) => {
    return (
        <div className="space-x-3">
            <Avatar className={className} name={name} size="small" />
            <Avatar className={className} name={name} size="medium" />
            <Avatar className={className} name={name} size="large" />
        </div>
    );
};
