import React from "react";
import { Button, Popover } from "..";

// More props in docs
const docs = "https://atomiks.github.io/tippyjs/v6/all-props/";

export default {
    title: "Components/Popover",
    component: Popover,
    argTypes: {
        demoText: getArg("Default", "text", null, "The value for the button", "for this demo only"),
        trigger: getArg(
            "mouseenter",
            "select",
            ["mouseenter", "click", "focus", "focusin", "manual"],
            "One or multiple values to indicate what causes the tooltip to show up",
        ),
        placement: getArg(
            "right",
            "inline-radio",
            ["top", "bottom", "left", "right", "auto"],
            `Where to place the tooltip. [More in the docs](${docs})`,
        ),
        delay: getArg(0, "number", null, "Delay in ms once a trigger event is fired before a tippy shows or hides"),
        maxWidth: getArg(
            350,
            "number",
            null,
            "Specifies the maximum width of the tippy. Useful to prevent it from being too horizontally wide to read",
        ),
        duration: getArg([300, 250], "array", null, "Duration in ms of the transition animation"),
        offset: getArg(
            [0, 10],
            "array",
            null,
            "Displaces the tippy from its reference element in pixels _(skidding and distance)_",
        ),
        zIndex: getArg(9999, "number", null, "Specifies the `z-index` CSS on the root popper node"),
    },
};

function getArg(defaultValue, type, options, description, summary = null) {
    return {
        type: { required: false },
        defaultValue,
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
        <Popover.Content>
            <div className="pb-1 text-base font-bold">Popover title</div>
            <div className="text-sm">And here's some amazing content. It's very engaging. Right?</div>
            <div className="text-sm">Here is some more because I am crazy</div>
        </Popover.Content>
    );

    return (
        <Popover {...rest} content={content}>
            <Button>{demoText}</Button>
        </Popover>
    );
};

export const NoTitle = ({ demoText, ...rest }) => {
    const content = (
        <Popover.Content>
            <dl className="text-sm space-y-2">
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
        <Popover {...rest} content={content}>
            <Button>{demoText}</Button>
        </Popover>
    );
};

// TODO: Assign guides
