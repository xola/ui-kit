import React from "react";
import { Tag } from "../..";

const TagStories = {
    title: "Data Display/Tag",
    component: Tag,
    args: {
        color: "primary",
        size: "medium",
        text: "Listing: Kayaking in the Ganges",
    },
    argTypes: {
        text: {
            type: { required: true },
            control: { type: "text" },
        },
        color: {
            options: ["primary", "secondary"],
            control: { type: "select" },
        },
        size: {
            options: ["small", "medium"],
            control: { type: "radio" },
        },
    },
};

const onTagCloseClick = () => {
    console.log("Closed");
};

export const Default = ({ color, size, text }) => {
    return (
        <Tag color={color} size={size} onClose={onTagCloseClick}>
            {text}
        </Tag>
    );
};

export const BookingTag = () => {
    return (
        <Tag color="secondary" size="small" onClose={onTagCloseClick}>
            Testing Tag
        </Tag>
    );
};

export const SystemTag = () => {
    return (
        <Tag color="secondary" size="small">
            You cannot remove this tag
        </Tag>
    );
};

export default TagStories;
