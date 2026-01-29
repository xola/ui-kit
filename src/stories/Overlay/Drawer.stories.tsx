// @ts-nocheck
import React, { useState } from "react";
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

export const SmallDrawer = () => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Button size="large" onClick={() => setOpen(true)}>
                Open Small Drawer
            </Button>
            <Drawer
                title="Small Drawer"
                content="This is a small drawer (w-72)"
                size="small"
                isOpen={open}
                onClose={() => setOpen(false)}
            />
        </div>
    );
};

export const MediumDrawer = () => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Button size="large" onClick={() => setOpen(true)}>
                Open Medium Drawer
            </Button>
            <Drawer
                title="Medium Drawer"
                content="This is a medium drawer (w-85)"
                size="medium"
                isOpen={open}
                onClose={() => setOpen(false)}
            />
        </div>
    );
};

export const LargeDrawer = () => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Button size="large" onClick={() => setOpen(true)}>
                Open Large Drawer
            </Button>
            <Drawer
                title="Large Drawer"
                content="This is a large drawer (w-110)"
                size="large"
                isOpen={open}
                onClose={() => setOpen(false)}
            />
        </div>
    );
};

export const ExtraLargeDrawer = () => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Button size="large" onClick={() => setOpen(true)}>
                Open XL Drawer
            </Button>
            <Drawer
                title="Extra Large Drawer"
                content="This is an extra large drawer (w-200)"
                size="xl"
                isOpen={open}
                onClose={() => setOpen(false)}
            />
        </div>
    );
};

export default DrawerStories;
