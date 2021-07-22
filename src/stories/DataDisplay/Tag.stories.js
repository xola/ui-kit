import React from "react";
import { Tag } from "../..";

const TagStories = {
    title: "Data Display/Tag",
    component: Tag,
    args: {
        color: "primary",
        size: "medium",
        text: "Listing: Kayaking in the Ganges",
        shouldAllowRemoval: true,
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
        shouldAllowRemoval: {
            control: { type: "boolean" },
        },
    },
};

const onTagCloseClick = () => {
    console.log("Closed");
};

export const Default = ({ color, size, text, shouldAllowRemoval }) => {
    return (
        <Tag shouldAllowRemoval={shouldAllowRemoval} color={color} size={size} onClickClose={onTagCloseClick}>
            {text}
        </Tag>
    );
};

export const BookingTag = () => {
    return (
        <Tag shouldAllowRemoval color="secondary" size="small" onClickClose={onTagCloseClick}>
            Testing Tag
        </Tag>
    );
};

export const SystemTag = () => {
    return (
        <Tag shouldAllowRemoval={false} color="secondary" size="small">
            You cannot remove this tag
        </Tag>
    );
};

export default TagStories;
