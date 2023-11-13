import React, { useState } from "react";
import { Button, Drawer } from "../..";
import { inlineRadio } from "../helpers";
import { drawerSizes } from "../../components/Drawer";

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
        size: inlineRadio(Object.keys(drawerSizes).slice(0, -1)),
        onClose: {
            description: "Function to callback to close the Drawer",
            control: { type: "function" },
        },
    },
};

export const Default = ({ isOpen, size, title, content }) => {
    const [open, setOpen] = useState(isOpen);
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

export default DrawerStories;
