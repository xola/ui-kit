import React, { useState } from "react";
import { Button, Slideover } from "..";

export default {
    title: "Components/Slideover",
    component: Slideover,
    parameters: {
        docs: {
            description: {
                component: "The Slideover component is a dynamic sidebar that is used to show data on the right side",
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
            description: "The title of the Slideover",
            type: { required: true },
            control: { type: "text" },
        },
        content: {
            description: "The body of the Slideover",
            control: { type: "text" },
        },
        onClose: {
            description: "Function to callback to close the Slideover",
            control: { type: "function" },
        },
    },
};

export const Default = ({title = "Hello World", content = "Lorem Ipsum. Click the X to close"}) => {
    const [open, setOpen] = useState(false);
    const onClose = () => setOpen(false);

    return (
        <div>
            <Button size="large" onClick={() => setOpen(true)}>Click Me to open the Slideover</Button>
            <Slideover title={title} content={content} open={open} onClose={onClose} />
        </div>
    );
};
