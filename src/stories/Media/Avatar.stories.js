import React, { Fragment } from "react";
import { Avatar } from "../..";

const avatarColors = [
    "bg-primary-lighter",
    "bg-warning-lighter",
    "bg-success-lighter",
    "bg-secondary",
    "bg-caution-lighter",
    "bg-danger-lighter",
];

const AvatarStories = {
    title: "Media/Avatar",
    component: Avatar,
    parameters: {
        docs: {
            description: {
                component:
                    "The avatar component is used to represent a user or seller. If the seller has a profile image that should be used instead",
            },
        },
    },
    args: {
        size: "large",
        rounded: "full",
        color: "bg-primary-lighter",
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
        rounded: {
            description: "Avatar border radius",
            table: {
                type: { summary: "one of the options" },
                defaultValue: { summary: "full" },
            },
            options: ["full", "half", "quarter", "none"],
            control: { type: "radio" },
        },
        size: {
            description: "Avatar Size",
            table: {
                type: { summary: "one of the options" },
                defaultValue: { summary: "large" },
            },
            options: ["small", "medium", "large"],
            control: { type: "radio" },
        },
        color: {
            description: "Colors",
            table: {
                type: { summary: "one of the options" },
                defaultValue: { summary: "bg-primary-lighter" },
            },
            options: avatarColors,
            control: { type: "select" },
        },
    },
};

export const Default = ({ className, name = "John Doe", size, rounded, color }) => {
    return <Avatar className={className} name={name} size={size}  rounded={rounded} color={color} />;
};

export const OneNameLikeCher = ({ className, name = "Cher", size, rounded, color }) => {
    return <Avatar className={className} name={name} size={size} rounded={rounded}  color={color} />;
};

export const ThreeNames = ({ className, name = "James Scott Zimmerman", size, rounded, color }) => {
    return <Avatar className={className} name={name} size={size} rounded={rounded}  color={color} />;
};

export const SpecialChars = ({ className, name = "Rushi (Xola)", size, rounded, color }) => {
    return <Avatar className={className} name={name} size={size} rounded={rounded}  color={color} />;
};

export const AllRoundedLevels = ({ className, name, size, color }) => {
    return (
        <div className="grid grid-cols-6 gap-2">
            {["full", "half", "quarter", "none"].map((rounded) => (
                <div key={rounded} className="text-center">
                    <Avatar className={className} name={name} size={size} rounded={rounded} color={color} />
                </div>
            ))
            }
        </div>
    );
};

export const AllColorsSizesAndRadiuses = ({ className, name = "Barthélémy Chalvet" }) => {
    const radius = ["full", "half", "quarter", "none"]

    return (
        <div className="grid grid-cols-6 gap-2">
            {["large", "medium", "small"].map((size) => (
                <Fragment key={size}>
                    {avatarColors.map((color, index) => (
                        <div key={color} className="text-center">
                            <Avatar className={className} name={name} size={size} rounded={radius[index]} color={color} />
                        </div>
                    ))}
                </Fragment>
            ))}
        </div>
    );
};

export default AvatarStories;
