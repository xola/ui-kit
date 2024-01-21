import React, { Fragment } from "react";
import { Avatar } from "../..";
import { avatarSizes } from "../../components/Avatar";
import { inlineRadioOptions, selectOptions, tableDefault } from "../helpers";

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
    tags: ["autodocs"],
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
        color: avatarColors[0],
        name: "John Doe",
    },
    argTypes: {
        name: {
            type: { required: true },
            control: { type: "text" },
            description: "A user's full name",
            ...tableDefault("example: John Doe"),
        },
        size: inlineRadioOptions(Object.keys(avatarSizes), tableDefault("large")),
        color: selectOptions(avatarColors, tableDefault("bg-primary-lighter")),
    },
};

export const Default = {};

export const OneNameLikeCher = {
    args: { name: "Cher" },
};

export const ThreeNames = {
    args: { name: "James Scott Zimmerman" },
};

export const SpecialChars = {
    args: { name: "Rushi (Xola)" },
};

export const AllColorsAndSizes = {
    args: {
        name: "Barthélémy Chalvet",
    },
    render: ({ name, className }) => {
        return (
            <div className="m-5 grid grid-cols-3 gap-6 xl:grid-cols-5">
                {Object.keys(avatarSizes).map((size) => (
                    <Fragment key={size}>
                        {avatarColors.map((color) => (
                            <Avatar
                                key={`${size}-${color}`}
                                name={name}
                                size={size}
                                color={color}
                                className={className}
                            />
                        ))}
                    </Fragment>
                ))}
            </div>
        );
    },
};

export default AvatarStories;
