import React from "react";
import { Button, Popover } from "../..";

// More props in docs
const documentationUrl = "https://atomiks.github.io/tippyjs/v6/all-props/";

const PopoverStories = {
    title: "Overlay/Popover",
    component: Popover,
    args: {
        trigger: "mouseenter",
        placement: "right",
        size: "large",
        delay: 0,
        maxWidth: 350,
        duration: [300, 250],
        offset: [0, 10],
    },
    argTypes: {
        demoText: getArgument("Default", "text", null, "The value for the button", "for this demo only"),
        trigger: getArgument(
            "mouseenter",
            "select",
            ["mouseenter", "click", "focus", "focusin", "manual"],
            "One or multiple values to indicate what causes the tooltip to show up",
        ),
        placement: getArgument(
            "right",
            "inline-radio",
            ["top", "bottom", "left", "right", "auto"],
            `Where to place the tooltip. [More in the docs](${documentationUrl})`,
        ),
        size: getArgument(
            "large",
            "inline-radio",
            ["small", "medium", "large"],
            "The expected size of this popover which will defined the appropriate padding for the *content*",
        ),
        delay: getArgument(
            0,
            "number",
            null,
            "Delay in ms once a trigger event is fired before a tippy shows or hides",
        ),
        maxWidth: getArgument(
            350,
            "number",
            null,
            "Specifies the maximum width of the tippy. Useful to prevent it from being too horizontally wide to read",
        ),
        duration: getArgument([300, 250], "array", null, "Duration in ms of the transition animation"),
        offset: getArgument(
            [0, 10],
            "array",
            null,
            "Displaces the tippy from its reference element in pixels _(skidding and distance)_",
        ),
        zIndex: getArgument(9999, "number", null, "Specifies the `z-index` CSS on the root popper node"),
    },
};

function getArgument(defaultValue, type, options, description, summary = null) {
    return {
        type: { required: false },
        description,
        options,
        control: { type },
        table: {
            type: { summary },
            defaultValue: { summary: defaultValue },
        },
    };
}

export const Default = ({ demoText, ...rest }) => {
    const content = (
        <Popover.Content className="space-y-2">
            <p className="p1 font-bold">Popover Title</p>
            <p className="p2">And here is some amazing content and it is very engaging. Right?</p>
            <p className="p2">Here is some more because I am crazy</p>
        </Popover.Content>
    );

    return (
        <div className="mt-10 h-20">
            <Popover {...rest} content={content}>
                <Button>{demoText}</Button>
            </Popover>
        </div>
    );
};

export const NoTitle = ({ demoText, ...rest }) => {
    const content = (
        <Popover.Content>
            <dl className="space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-4">
                    <dt className="font-bold">Demo Request</dt>
                    <dd>Dec 21, 2020</dd>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <dt className="font-bold">Join Request</dt>
                    <dd>Dec 24, 2020</dd>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <dt className="font-bold">Account Created</dt>
                    <dd>Dec 31, 2020</dd>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <dt className="font-bold">Account Verified</dt>
                    <dd>Jan 5, 2021</dd>
                </div>
            </dl>
        </Popover.Content>
    );

    return (
        <div className="mt-10 h-20">
            <Popover {...rest} content={content}>
                <Button>{demoText}</Button>
            </Popover>
        </div>
    );
};

export default PopoverStories;
