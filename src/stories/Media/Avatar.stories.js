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
        design: {
            name: "Figma",
            type: "figma",
            url: "https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=1848%3A51732",
        },
    },
    args: {
        size: "large",
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
                        <div key={color} className="text-center">
                            <Avatar className={className} name={name} size={size} color={color} />
                        </div>
                    ))}
                </Fragment>
            ))}
        </div>
    );
};

export default AvatarStories;
