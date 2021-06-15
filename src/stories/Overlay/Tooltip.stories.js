import React from "react";
import { Button, Tooltip, UserIcon } from "../..";

// More props in docs
const documentationUrl = "https://atomiks.github.io/tippyjs/v6/all-props/";

const TooltipStories = {
    title: "Overlay/Tooltip",
    component: Tooltip,
    argTypes: {
        demoText: getArgument("Default", "text", null, "The value for the button", "for this demo only"),
        content: getArgument("My tooltip text", "text", null, "The text of the tooltip"),
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
        allowHTML: getArgument(false, "boolean", false, "Allow HTML content in tooltip"),
        delay: getArgument(
            0,
            "number",
            null,
            "Delay in ms once a trigger event is fired before a tooltip shows or hides",
        ),
        maxWidth: getArgument(
            350,
            "number",
            null,
            "Specifies the maximum width of the tooltip. Useful to prevent it from being too horizontally wide to read",
        ),
        duration: getArgument([300, 250], "array", null, "Duration in ms of the transition animation"),
        offset: getArgument(
            [0, 10],
            "array",
            null,
            "Displaces the tooltip from its reference element in pixels _(skidding and distance)_",
        ),
        zIndex: getArgument(9999, "number", null, "Specifies the `z-index` CSS on the root popper node"),
    },
};

function getArgument(defaultValue, type, options, description, summary = null) {
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

export default TooltipStories;
