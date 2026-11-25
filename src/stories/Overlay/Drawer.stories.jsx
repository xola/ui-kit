import React, { useState } from "react";
import { expect, within } from "storybook/test";
import { Button, Drawer } from "../..";

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
    argTypes: {
        isOpen: {
            description: "Open or close the sidebar",
            type: { required: true },
            control: { type: "boolean" },
        },
        title: {
            description: "The title of the Drawer",
            type: { required: true },
            control: { type: "text" },
        },
        content: {
            description: "The body of the Drawer",
            control: { type: "text" },
        },
        size: {
            description: "The width of the drawer when it opens",
            options: ["small", "medium", "large"],
            control: { type: "select" },
        },
        onClose: {
            description: "Function to callback to close the Drawer",
            control: { type: "function" },
        },
    },
};

export const Drawers = ({ title = "Hello World", size, content = "Lorem Ipsum. Click the X to close" }) => {
    const [open, setOpen] = useState(false);
    const onClose = () => setOpen(false);

    return (
        <div>
            <Button size="large" onClick={() => setOpen(true)}>
                Click Me to open the Drawer
            </Button>
            <Drawer title={title} content={content} size={size} isOpen={open} onClose={onClose} />
        </div>
    );
};

Drawers.play = async ({ canvas, canvasElement, userEvent }) => {
    const body = within(canvasElement.ownerDocument.body);
    await expect(body.queryByText("Hello World")).not.toBeInTheDocument();

    await userEvent.click(canvas.getByRole("button", { name: "Click Me to open the Drawer" }));
    await expect(await body.findByText("Hello World")).toBeInTheDocument();
    await expect(body.getByText("Lorem Ipsum. Click the X to close")).toBeInTheDocument();
};

export const NoOptionalProps = () => {
    return <Drawer isOpen content="Drawer body" onClose={() => {}} />;
};

NoOptionalProps.play = async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);
    await expect(await body.findByText("Drawer body")).toBeInTheDocument();

    const container = canvasElement.ownerDocument.body.querySelector(".ui-drawer-container");
    await expect(container.style.right).toBe("0px");
    await expect(container.style.left).toBe("");

    const panel = body.getByText("Drawer body").closest(".w-85");
    await expect(panel).not.toBeNull();
    await expect(panel.previousElementSibling).toBe(within(container).getByRole("button"));
};

export default DrawerStories;
