import React from "react";
import { expect } from "storybook/test";
import { Tag } from "../..";

const TagStories = {
    title: "Data Display/Tag",
    component: Tag,
    args: {
        color: "primary",
        size: "medium",
        text: "Listing: Kayaking in the Ganges",
    },
    parameters: {
        design: {
            name: "Figma",
            type: "figma",
            url: "https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=384%3A60",
        },
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
            options: ["small", "medium", "large"],
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

Default.play = async ({ canvas, canvasElement, args }) => {
    await expect(canvas.getByText(args.text)).toBeInTheDocument();
    // onClose provided, so the tag is removable and shows a close affordance
    await expect(canvasElement.querySelector(".ui-tag-close")).toBeInTheDocument();
};

export const BookingTag = () => {
    return (
        <Tag color="secondary" size="small" onClose={onTagCloseClick}>
            Testing Tag
        </Tag>
    );
};

BookingTag.play = async ({ canvas, canvasElement }) => {
    await expect(canvas.getByText("Testing Tag")).toBeInTheDocument();
    await expect(canvasElement.querySelector(".ui-tag-close")).toBeInTheDocument();
};

export const SystemTag = () => {
    return (
        <Tag color="secondary" size="small">
            You cannot remove this tag
        </Tag>
    );
};

SystemTag.play = async ({ canvas, canvasElement }) => {
    await expect(canvas.getByText("You cannot remove this tag")).toBeInTheDocument();
    // No onClose, so there must be no close affordance
    await expect(canvasElement.querySelector(".ui-tag-close")).not.toBeInTheDocument();
};

export default TagStories;
