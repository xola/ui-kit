import React, { useState } from "react";
import { expect, fn, waitFor, within } from "storybook/test";
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

export const Drawers = ({ title = "Hello World", size, content = "Lorem Ipsum. Click the X to close", onClose }) => {
    const [open, setOpen] = useState(false);

    const handleClose = (value) => {
        onClose(value);
        setOpen(false);
    };

    return (
        <div>
            <Button size="large" onClick={() => setOpen(true)}>
                Click Me to open the Drawer
            </Button>
            <Drawer title={title} content={content} size={size} isOpen={open} onClose={handleClose} />
        </div>
    );
};

Drawers.args = {
    onClose: fn(),
};

Drawers.play = async ({ args, canvas, canvasElement, userEvent }) => {
    const { ownerDocument } = canvasElement;
    const body = within(ownerDocument.body);
    const launcher = canvas.getByRole("button", { name: "Click Me to open the Drawer" });
    await expect(body.queryByText("Hello World")).not.toBeInTheDocument();

    await userEvent.click(launcher);
    const dialog = await body.findByRole("dialog");

    // The panel starts translated past the right edge and slides in until it sits flush with its container
    const container = dialog.querySelector(".ui-drawer-container");
    const panel = container.firstElementChild;
    await expect(container).toHaveStyle({ right: "0px" });
    await expect(panel.getBoundingClientRect().right).toBeGreaterThan(container.getBoundingClientRect().right);
    await waitFor(
        () => expect(panel.getBoundingClientRect().right).toBeCloseTo(container.getBoundingClientRect().right, 0),
        { timeout: 2000 },
    );

    await expect(body.getByText("Hello World")).toBeInTheDocument();
    await expect(body.getByText("Lorem Ipsum. Click the X to close")).toBeInTheDocument();

    // Opening focuses the first focusable element inside, not the dialog container itself
    await waitFor(() => {
        expect(dialog).toContainElement(ownerDocument.activeElement);
        expect(ownerDocument.activeElement).not.toBe(dialog);
    });

    for (let press = 0; press < 3; press++) {
        await userEvent.tab();
        await waitFor(() => expect(dialog).toContainElement(ownerDocument.activeElement));
    }

    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(body.queryByText("Hello World")).not.toBeInTheDocument());
    await expect(args.onClose).toHaveBeenCalledExactlyOnceWith(false);

    await userEvent.click(launcher);
    await body.findByText("Hello World");
    await userEvent.click(ownerDocument.querySelector(".ui-drawer-overlay"));
    await waitFor(() => expect(body.queryByText("Hello World")).not.toBeInTheDocument());
    await expect(args.onClose).toHaveBeenCalledTimes(2);
    await expect(args.onClose).toHaveBeenLastCalledWith(false);
};

export default DrawerStories;
