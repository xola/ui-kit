import React from "react";
import { Toaster } from "react-hot-toast";
import { Button, flash } from "../..";
import { inlineRadioOptions, selectOptions, sizeParams } from "../helpers";
import { flashColors } from "../../helpers/flash";

const FlashStories = {
    title: "Data Display/Flash",
    parameters: {
        docs: {
            description: {
                component: "Show a notification",
            },
        },
    },
    tags: ["autodocs"],
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
        size: sizeParams,
        color: selectOptions(Object.keys(flashColors)),
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
    props.onClose = (event_, toast) => flash.dismiss(toast.id);
    flash.show(props);
};

export const Default = {
    render: (props) => {
        const { duration, color = "primary", text } = props;
        return (
            <div className="space-y-6">
                <div>Click below to show a flash</div>
                <Button onClick={() => toastMe(props)}>{text}</Button>

                <pre>
                    <code>{`flash.show({ text: "${text}", color: "${color}", duration: ${duration} })`}</code>
                </pre>

                <div>
                    <Button size="small" variant="outline" color="secondary" onClick={() => flash.dismiss()}>
                        Dismiss All
                    </Button>
                </div>

                {/* Make sure Toaster is added to a root component */}
                <Toaster />
            </div>
        );
    },
};

export const AllStyles = {
    render: ({ size, text, canClose }) => {
        const handleClose = () => {
            console.log("Closed");
        };

        return (
            <div className="w-96 space-y-8">
                {FlashStories.argTypes.color.options.map((color) => {
                    const classes = flash.getStyles(color, size, "relative", true);
                    return flash.container(`[${color}] ${text}`, classes, canClose ? handleClose : null, {
                        id: `flash-${color}`,
                        visible: true,
                    });
                })}
            </div>
        );
    },
};

export default FlashStories;
