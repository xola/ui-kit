import React from 'react'
import { Button, Popover } from "..";

// More props in docs
const docs = "https://atomiks.github.io/tippyjs/v6/all-props/";

export default {
    title: "Popover",
    component: Popover,
    // decorators: [
    //     (Popover) => (
    //         <div style={{ margin: "2em" }}>
    //             <Popover />
    //         </div>
    //     ),
    // ],
    argTypes: {
        demoText: getArg("Default", "text", null, "The value for the button", "for this demo only"),
        trigger: getArg(
            "mouseenter",
            "radio",
            ["mouseenter", "click", "focus", "focusin", "manual"],
            "One or multiple values to indicate what causes the tooltip to show up",
        ),
        placement: getArg(
            "right",
            "radio",
            ["top", "bottom", "left", "right", "auto"],
            `Where to place the tooltip. [More in the docs](${docs})`,
        ),
        interactive: getArg(
            true,
            "boolean",
            false,
            "Determines if the tippy has interactive content inside of it, so that it can be hovered over and clicked inside without hiding",
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
        followCursor: getArg(
            "false",
            "radio",
            [false, true, "vertical", "horizontal", "initial"],
            "Determines if tooltip follows the user's cursor",
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

export const Default = (config) => {
    config.content = (
        <Popover.Content>
            <div className="text-md font-bold">Popover title</div>
            <div className="text-sm">And here's some amazing content. It's very engaging. Right?</div>
            <div className="text-sm">Here is some more because I am crazy</div>
        </Popover.Content>
    );
    return (
        <Popover {...config}>
            <Button>{config.demoText}</Button>
        </Popover>
    );
};

export const NoTitle = (config) => {
    config.content = (
        <Popover.Content>
            <dl className="text-sm">
                <div className="py-1 grid grid-cols-2 gap-4 px-2">
                    <dt className="text-black font-bold">Demo Request</dt>
                    <dd className="mt-1 text-black mt-0">Dec 21, 2020</dd>
                </div>
                <div className="py-1 grid grid-cols-2 gap-4 px-2">
                    <dt className="text-black font-bold">Join Request</dt>
                    <dd className="mt-1 text-black mt-0">Dec 24, 2020</dd>
                </div>
                <div className="py-1 grid grid-cols-2 gap-4 px-2">
                    <dt className="text-black font-bold">Account Created</dt>
                    <dd className="mt-1 text-black mt-0">Dec 31, 2020</dd>
                </div>
                <div className="py-1 grid grid-cols-2 gap-4 px-2">
                    <dt className="text-black font-bold">Account Verified</dt>
                    <dd className="mt-1 text-black mt-0">Jan 5, 2021</dd>
                </div>
            </dl>
        </Popover.Content>
    );
    return (
        <Popover {...config}>
            <Button>{config.demoText}</Button>
        </Popover>
    );
};

// TODO: Assign guides
