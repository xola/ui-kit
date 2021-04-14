import React, { useState } from "react";
import clsx from "clsx";
import { Button, Tooltip, UserIcon } from "..";

export default {
    title: "Tooltip",
    component: Tooltip,
    argTypes: {
        text: {
            type: { required: false },
            defaultValue: "Default",
            control: {
                type: "text",
            },
        },
        trigger: {
            type: { required: false },
            defaultValue: "hover",
            control: {
                type: "radio",
                options: ["hover", "click"],
            },
        },
        placement: {
            type: { required: false },
            defaultValue: "right",
            control: {
                type: "radio",
                options: ["top", "bottom", "left", "right", "auto"],
            },
        },
        offset: {
            defaultValue: [0, 2],
            control: {
                type: "array",
            },
        },
        delayHide: {
            type: { required: false },
            defaultValue: 0,
            control: {
                type: "number",
            },
        },
        delayShow: {
            type: { required: false },
            defaultValue: 0,
            control: {
                type: "number",
            },
        },
        followCursor: {
            type: { required: false },
            defaultValue: false,
            control: {
                type: "boolean",
            },
        },
        interactive: {
            type: { required: false },
            defaultValue: false,
            control: {
                type: "boolean",
            },
        },
        closeOnOutsideClick: {
            type: { required: false },
            defaultValue: true,
            control: {
                type: "boolean",
            },
        },
        closeOnTriggerHidden: {
            type: { required: false },
            defaultValue: false,
            control: {
                type: "boolean",
            },
        },
    },
};

export const Default = (config) => {
    return (
        <Tooltip {...config}>
            <Button>{config.text}</Button>
        </Tooltip>
    );
};

export const OnAnIcon = (config) => {
    config.text = "Hello, I am user icon";
    return (
        <Tooltip {...config}>
            <UserIcon className="inline" />
        </Tooltip>
    );
};