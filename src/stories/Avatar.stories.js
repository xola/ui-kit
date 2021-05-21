import React, { Fragment } from "react";
import { Avatar } from "..";

const avatarColors = [
    "bg-primary-lighter",
    "bg-yellow-lighter",
    "bg-green-lighter",
    "bg-gray",
    "bg-orange-lighter",
    "bg-red-lighter",
];

export default {
    title: "Components/Avatar",
    component: Avatar,
    parameters: {
        docs: {
            description: {
                component:
                    "The avatar component is used to represent a user or seller. If the seller has a profile image that should be used instead",
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
        color: {
            description: "Colors",
            defaultValue: "bg-primary-lighter",
            table: {
                type: { summary: "one of the options" },
                defaultValue: { summary: "bg-primary-lighter" },
            },
            options: avatarColors,
            control: { type: "select" },
        },
    },
};

export const Default = ({ className, name = "John Doe", size, color }) => {
    return <Avatar className={className} name={name} size={size} color={color} />;
};

export const OneNameLikeCher = ({ className, name = "Cher", size, color }) => {
    return <Avatar className={className} name={name} size={size} color={color} />;
};

export const ThreeNames = ({ className, name = "James Scott Zimmerman", size, color }) => {
    return <Avatar className={className} name={name} size={size} color={color} />;
};

export const SpecialChars = ({ className, name = "Rushi (Xola)", size, color }) => {
    return <Avatar className={className} name={name} size={size} color={color} />;
};

export const AllColorsAndSizes = ({ className, name = "Barthélémy Chalvet" }) => {
    return (
        <div className="grid grid-cols-6 gap-2">
            {["large", "medium", "small"].map((size) => (
                <Fragment key={size}>
                    {avatarColors.map((color) => (
                        <div className="text-center" key={color}>
                            <Avatar className={className} name={name} size={size} color={color} />
                        </div>
                    ))}
                </Fragment>
            ))}
        </div>
    );
};
