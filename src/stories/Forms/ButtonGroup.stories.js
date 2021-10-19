import React, { useState } from "react";
import { ButtonGroup, ChecklistIcon, EmptyChecklistIcon, MixedChecklistIcon, WaitlistIcon } from "../..";

const ButtonGroupStories = {
    title: "Forms & Fields/Buttons/ButtonGroup",
    component: ButtonGroup,
    args: {
        size: "medium",
    },
    argTypes: {
        size: {
            options: ["small", "medium", "large"],
            control: { type: "radio" },
            table: {
                defaultValue: { summary: "medium" },
            },
        },
        value: {
            description: "An integer from 0 onwards to indicate which button is active. Defaults to `null`",
            control: { type: "number" },
            table: {
                defaultValue: { summary: null },
            },
        },
    },
};

export const Default = ({ size = "medium", value = -1 }) => {
    const [active, setActive] = useState(value);

    return (
        <ButtonGroup size={size} value={active} onChange={(index) => setActive(index)}>
            <ButtonGroup.Button>First</ButtonGroup.Button>
            <ButtonGroup.Button>Second</ButtonGroup.Button>
            <ButtonGroup.Button>Third</ButtonGroup.Button>
        </ButtonGroup>
    );
};

export const WithIcons = ({ size, value = -1 }) => {
    const [active, setActive] = useState(value);

    return (
        <ButtonGroup size={size} value={active} onChange={(index) => setActive(index)}>
            <ButtonGroup.Button icon={<ChecklistIcon />}>Reserved</ButtonGroup.Button>
            <ButtonGroup.Button icon={<WaitlistIcon />}>Waitlist</ButtonGroup.Button>
            <ButtonGroup.Button icon={<EmptyChecklistIcon />}>Available</ButtonGroup.Button>
            <ButtonGroup.Button icon={<MixedChecklistIcon />}>All</ButtonGroup.Button>
        </ButtonGroup>
    );
};

WithIcons.parameters = {
    docs: {
        description: {
            story: "Use `icon` and `iconPlacement` attributes to show an icon with the text and control it's positioning",
        },
    },
};

export const Collapsible = ({ size, value = 0 }) => {
    const [active, setActive] = useState(value);

    return (
        <ButtonGroup isCollapsed size={size} value={active} onChange={(index) => setActive(index)}>
            <ButtonGroup.Button icon={<ChecklistIcon />}>Reserved</ButtonGroup.Button>
            <ButtonGroup.Button icon={<WaitlistIcon />}>Waitlist</ButtonGroup.Button>
            <ButtonGroup.Button icon={<EmptyChecklistIcon />}>Available</ButtonGroup.Button>
            <ButtonGroup.Button icon={<MixedChecklistIcon />}>All</ButtonGroup.Button>
        </ButtonGroup>
    );
};

Collapsible.parameters = {
    docs: {
        description: {
            story: "Pass `isCollapsed` to only show the active button's text in the ButtonGroup",
        },
    },
};

export default ButtonGroupStories;
