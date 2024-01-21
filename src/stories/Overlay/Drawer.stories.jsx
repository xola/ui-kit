import React, { useEffect, useState } from "react";
import { Button, Drawer } from "../..";
import { inlineRadioOptions } from "../helpers";
import { drawerSizes } from "../../components/Drawer";
import { userEvent, within } from "@storybook/testing-library";

const DrawerStories = {
    title: "Overlay/Drawers",
    component: Drawer,
    parameters: {
        docs: {
            description: {
                component: "The Drawer component is a dynamic sidebar that is used to show data on the right side",
            },
        },
        design: {
            name: "Figma",
            type: "figma",
            url: "https://www.figma.com/file/YCbs6YcoYUNYGq9VhrEFQ0/13-Admin?node-id=960%3A27700&viewport=1028%2C673%2C0.38",
        },
    },
    args: {
        isOpen: false,
        size: "medium",
        title: "Hello World",
        position: "right",
        content: "Lorem Ipsum. Click the X to close",
    },
    argTypes: {
        title: {
            description: "The title of the Drawer",
            type: { required: true },
            control: { type: "text" },
        },
        content: {
            description: "The body of the Drawer",
            control: { type: "text" },
        },
        size: inlineRadioOptions(Object.keys(drawerSizes).slice(0, -1)),
        position: inlineRadioOptions(["left", "right"]),
        onClose: {
            description: "Function to callback to close the Drawer",
            control: { type: "function" },
        },
    },
};

export const Default = {
    // This will click the button when the canvas loads
    // Docs: https://storybook.js.org/docs/react/writing-stories/play-function
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByRole("button"));
    },
    render: ({ isOpen, size, title, position, content }) => {
        const [open, setOpen] = useState(isOpen);
        useEffect(() => setOpen(isOpen), [isOpen]);
        const onClose = () => setOpen(false);

        return (
            <div>
                <Button size="large" onClick={() => setOpen(true)}>
                    Click Me
                </Button>
                <Drawer
                    title={title}
                    content={content}
                    size={size}
                    isOpen={open}
                    position={position}
                    onClose={onClose}
                />
            </div>
        );
    },
};

export default DrawerStories;
