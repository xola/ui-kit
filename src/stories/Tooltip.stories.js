import React from "react";
import { Button, Tooltip, UserIcon } from "..";

// More props in docs
const docs = "https://atomiks.github.io/tippyjs/v6/all-props/";

export default {
    title: "Tooltip",
    component: Tooltip,
    argTypes: {
        demoText: getArg("Default", "text", null, "The value for the button", "for this demo only"),
        content: getArg("My tooltip text", "text", null, "The text of the tooltip"),
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
        allowHTML: getArg(false, "boolean", false, "Allow HTML content in tooltip"),
        interactive: getArg(
            false,
            "boolean",
            false,
            "Determines if the tooltip has interactive content inside of it, so that it can be hovered over and clicked inside without hiding",
        ),
        delay: getArg(0, "number", null, "Delay in ms once a trigger event is fired before a tooltip shows or hides"),
        maxWidth: getArg(
            350,
            "number",
            null,
            "Specifies the maximum width of the tooltip. Useful to prevent it from being too horizontally wide to read",
        ),
        duration: getArg([300, 250], "array", null, "Duration in ms of the transition animation"),
        offset: getArg(
            [0, 10],
            "array",
            null,
            "Displaces the tooltip from its reference element in pixels _(skidding and distance)_",
        ),
        followCursor: getArg(
            false,
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
    return (
        <Tooltip {...config}>
            <Button>{config.demoText}</Button>
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
