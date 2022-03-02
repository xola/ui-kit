import React from "react";
import { Toaster } from "react-hot-toast";
import { Button, flash } from "../..";

const FlashStories = {
    title: "Data Display/Flash",
    parameters: {
        docs: {
            description: {
                component: "Show a notification",
            },
        },
    },
    args: {
        text: "Your booking was successfully created",
        size: "medium",
        color: "success",
        duration: 3000,
        canClose: true,
    },
    argTypes: {
        text: {
            type: { required: false },
            description: "The text in the component. For **demo** only",
            control: { type: "text" },
        },
        size: {
            options: ["small", "medium", "large"],
            control: { type: "inline-radio" },
            table: {
                defaultValue: { summary: "medium" },
            },
        },
        color: {
            options: ["primary", "secondary", "success", "warning", "danger"],
            control: { type: "select" },
            table: {
                defaultValue: { summary: "primary" },
            },
        },
        duration: {
            type: { required: false },
            description: "Time in `ms`",
            control: { type: "number" },
        },
        canClose: {
            control: { type: "boolean" },
            table: {
                defaultValue: { summary: true },
            },
        },
    },
};

const toastMe = (props) => {
    props.onClose = (event_, toast) => {
        flash.dismiss(toast.id);
    };

    flash.show(props);
};

export const Default = (props) => {
    return (
        <div className="space-y-3">
            <div>Click below to show a flash</div>
            <Button onClick={() => toastMe(props)}>{props.text}</Button>

            <div>
                <Button size="small" color="warning" onClick={() => flash.dismiss()}>
                    Dismiss All
                </Button>
            </div>

            {/* Make sure Toaster is added to a root component */}
            <Toaster />
        </div>
    );
};

export const ViewContainer = (props) => {
    const classes = flash.getStyles(props.color, props.size, "relative", true);
    return flash.container(props.text, classes, props.canClose ? () => {} : null, { id: "foo", visible: true });
};

export default FlashStories;
