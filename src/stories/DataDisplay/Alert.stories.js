import React from "react";
import { Alert } from "../..";

const AlertStories = {
    title: "Data Display/Alerts & Banners",
    component: Alert,
    parameters: {
        docs: {
            description: {
                component: "Alerts are short one line components whereas banners are multi-line versions of banners",
            },
        },
        design: {
            name: "Figma",
            type: "figma",
            url: "https://www.figma.com/file/EFmxLREOeGUse5zksD3iT4/%E2%9A%99%EF%B8%8F-02---DS-Application-UI?node-id=198%3A110085&viewport=-5176%2C179%2C0.57",
        },
    },
    args: {
        text: "Space, the final frontier. These are the voyages of the starship Enterprise. Its five year mission: to explore strange new worlds, to seek out new life and new civilizations, to boldly go where no man has gone before!",
        color: "primary",
    },
    argTypes: {
        text: {
            type: { required: false },
            description: "The text in the component",
            control: { type: "text" },
            table: {
                type: { summary: "For demo only" },
            },
        },
        color: {
            options: ["primary", "success", "warning", "danger"],
            control: { type: "select" },
            table: {
                type: { summary: null },
                defaultValue: { summary: "primary" },
            },
        },
    },
};

export const Default = ({ className, color, text = "Default" }) => {
    return (
        <div className="space-x-4">
            <Alert className={className} color={color}>
                {text}
            </Alert>
        </div>
    );
};

export const Colors = () => {
    return (
        <div className="space-y-4">
            <Alert color="primary">Primary</Alert>
            <Alert color="success">Success</Alert>
            <Alert color="warning">Warning</Alert>
            <Alert color="danger">Danger</Alert>
        </div>
    );
};

export const Dismissible = () => {
    const handleClose = () => {
        // eslint-disable-next-line no-alert
        alert("You clicked on the close button.");
    };

    return (
        <Alert color="primary" onClose={handleClose}>
            Space, the final frontier. These are the voyages of the starship Enterprise. Its five year mission: to
            explore strange new worlds, to seek out new life and new civilizations, to boldly go where no man has gone
            before!
        </Alert>
    );
};

export default AlertStories;
