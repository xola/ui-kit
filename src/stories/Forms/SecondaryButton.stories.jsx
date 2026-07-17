import React from "react";
import { expect } from "storybook/test";
import { SecondaryButton } from "../..";

const SecondaryButtonStories = {
    title: "Forms & Fields/Buttons/Secondary Button",
    component: SecondaryButton,
    args: {
        size: "medium",
        disabled: false,
    },
    argTypes: {
        size: {
            options: ["small", "medium", "large"],
            control: { type: "radio" },
            table: {
                defaultValue: { summary: "medium" },
            },
        },
        disabled: {
            control: { type: "boolean" },
            table: {
                defaultValue: { summary: false },
            },
        },
    },
};

export const Default = (args) => (
    <div className="space-x-4">
        <SecondaryButton {...args}>Secondary</SecondaryButton>
        <SecondaryButton {...args}>Button with really long text</SecondaryButton>
    </div>
);

Default.play = async ({ canvas }) => {
    await expect(canvas.getByText("Secondary")).toBeInTheDocument();
    const buttons = canvas.getAllByRole("button");
    await expect(buttons).toHaveLength(2);
    await expect(buttons[0]).toBeEnabled();
};

export default SecondaryButtonStories;
