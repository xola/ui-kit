import React, { useState } from "react";
import { expect, waitFor } from "storybook/test";
import { Button, SlideDown } from "../..";

const SlideDownStories = {
    title: "Other/Animation/Slide Down",
    component: SlideDown,
    parameters: {
        docs: {
            description: {
                component: "Slides its content down into view while `isOpen` is true, and back up when it turns false",
            },
        },
    },
};

export const Default = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="space-y-4">
            <Button onClick={toggle}>Toggle content</Button>

            <SlideDown isOpen={isOpen}>
                <div className="rounded bg-gray-lighter p-4">Slid down into view</div>
            </SlideDown>
        </div>
    );
};

Default.play = async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole("button", { name: "Toggle content" });
    await expect(canvas.queryByText("Slid down into view")).not.toBeInTheDocument();

    await userEvent.click(toggle);
    await waitFor(() => expect(canvas.getByText("Slid down into view")).toBeVisible(), { timeout: 2000 });

    await userEvent.click(toggle);
    await waitFor(() => expect(canvas.queryByText("Slid down into view")).not.toBeInTheDocument(), {
        timeout: 2000,
    });
};

export const Visible = () => {
    return (
        <SlideDown isOpen>
            <div className="rounded bg-gray-lighter p-4">Slid down into view</div>
        </SlideDown>
    );
};

Visible.play = async ({ canvas }) => {
    await waitFor(() => expect(canvas.getByText("Slid down into view")).toBeVisible(), { timeout: 2000 });
};

export default SlideDownStories;
