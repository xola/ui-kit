import React from "react";
import { Alert } from "../..";
import { inlineRadioOptions } from "../helpers";
import { alertColors } from "../../components/Alert";

export default {
    title: "Data Display/Alerts & Banners",
    component: Alert,
    tags: ["autodocs"],
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
    argTypes: {
        color: inlineRadioOptions(Object.keys(alertColors)),
    },
    args: {
        color: "primary",
        children:
            "Space, the final frontier. These are the voyages of the starship Enterprise. " +
            "Its five-year mission: to explore strange new worlds, to seek out new life and new civilizations, " +
            "to boldly go where no man has gone before!",
    },
};

export const Default = {};

export const Colors = {
    render: (args) => {
        return (
            <div className="space-y-4">
                <Alert {...args} color="primary">
                    Primary
                </Alert>
                <Alert {...args} color="secondary">
                    Secondary
                </Alert>
                <Alert {...args} color="success">
                    Success
                </Alert>
                <Alert {...args} color="warning">
                    Warning
                </Alert>
                <Alert {...args} color="caution">
                    Caution
                </Alert>
                <Alert {...args} color="danger">
                    Danger
                </Alert>
            </div>
        );
    },
};

export const Dismissible = {
    args: {
        onClose: () => alert("You clicked on the close button."),
    },
};
