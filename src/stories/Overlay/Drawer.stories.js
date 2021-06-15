import React, { useState } from "react";
import { Button, Drawer } from "../..";

const DrawerStories = {
    title: "Overlay/Drawer",
    component: Drawer,
    parameters: {
        docs: {
            description: {
                component: "The Drawer component is a dynamic sidebar that is used to show data on the right side",
            },
        },
    },
    argTypes: {
        open: {
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
        onClose: {
            description: "Function to callback to close the Drawer",
            control: { type: "function" },
        },
    },
};

export const Default = ({ title = "Hello World", content = "Lorem Ipsum. Click the X to close" }) => {
    const [open, setOpen] = useState(false);
    const onClose = () => setOpen(false);

    return (
        <div>
            <Button size="large" onClick={() => setOpen(true)}>
                Click Me to open the Drawer
            </Button>
            <Drawer title={title} content={content} open={open} onClose={onClose} />
        </div>
    );
};

export default DrawerStories;
