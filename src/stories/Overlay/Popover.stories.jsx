import React from "react";
import { Button, Popover } from "../..";

// More props in docs
const documentationUrl = "https://atomiks.github.io/tippyjs/v6/all-props/";

const PopoverStories = {
    id: "Popover",
    title: "Overlay/Popover",
    component: Popover,
    args: {
        trigger: "mouseenter",
        placement: "right",
        delay: 0,
        maxWidth: 350,
        skidding: 0,
        distance: 10,
        duration: [300, 250],
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
            "select",
            ["top", "bottom", "left", "right", "auto"],
            `Where to place the tooltip. [More in the docs](${documentationUrl})`,
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
        skidding: getArgument(
            0,
            "number",
            null,
            "The amount in pixels to offset along the reference. See: https://popper.js.org/docs/v2/modifiers/offset/#skidding-1",
        ),
        distance: getArgument(
            10,
            "number",
            null,
            "The amount in pixels to to displace the popover from, or toward the reference element in direction of it's placement. Positive means further away, negative lets it overlap the reference. See: https://popper.js.org/docs/v2/modifiers/offset/#distance-1",
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

export const Default = ({ demoText = "Hello World", ...rest }) => {
    return (
        <div className="mt-10 h-20">
            <Popover {...rest}>
                <Button>{demoText}</Button>
                <Popover.Content className="space-y-2 p-4">
                    <p className="p1 font-bold">Popover Title</p>
                    <p className="p2">And here is some amazing content and it is very engaging. Right?</p>
                    <p className="p2">Here is some more because I am crazy</p>
                </Popover.Content>
            </Popover>
        </div>
    );
};

export const NoTitle = ({ demoText = "Detailed", ...rest }) => {
    return (
        <div className="mt-10 h-20">
            <Popover {...rest}>
                <Button>{demoText}</Button>
                <Popover.Content className="p-4">
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
            </Popover>
        </div>
    );
};

export default PopoverStories;
