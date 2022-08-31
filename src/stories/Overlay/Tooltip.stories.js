import React from "react";
import { Button, Tooltip, UserIcon } from "../..";

// More props in docs
const documentationUrl = "https://atomiks.github.io/tippyjs/v6/all-props/";

const TooltipStories = {
    title: "Overlay/Tooltip",
    component: Tooltip,
    args: {
        content: "Hey there!",
        trigger: "mouseenter",
        placement: "right",
        allowHTML: false,
        delay: 0,
        maxWidth: 350,
        duration: [300, 250],
        offset: [0, 10],
        zIndex: 9999,
    },
    argTypes: {
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
            <Button>Hello World</Button>
        </Tooltip>
    );
};

export const WithHTMLContent = () => {
    return (
        <>
            <p className="mb-3">
                Since React escapes all HTML passed into props, pass a React element to the{" "}
                <code className="bg-gray-lighter px-1">content</code> prop to show HTML content.
            </p>
            <Tooltip
                placement="right"
                content={
                    <span className="grid grid-cols-2 gap-1">
                        <span>
                            This is <b>bold</b>
                        </span>
                        <span>in a grid</span>
                        <span>in two rows</span>
                        <span>you now have a table!</span>
                    </span>
                }
            >
                <Button>Hello World</Button>
            </Tooltip>
        </>
    );
};

export const OnAnIcon = (config) => {
    return (
        <Tooltip {...config}>
            <Button color="secondary" variant="outline" size="medium">
                <UserIcon size="medium" />
            </Button>
        </Tooltip>
    );
};

export default TooltipStories;
