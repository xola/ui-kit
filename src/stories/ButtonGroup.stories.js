import React, { useState } from "react";
import { ButtonGroup, ChecklistIcon, EmptyChecklistIcon, WaitlistIcon } from "..";

const ButtonGroupStories = {
    title: "Components/ButtonGroup",
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
            control: { type: "number" },
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
            <ButtonGroup.Button icon={<EmptyChecklistIcon />}>All</ButtonGroup.Button>
            <ButtonGroup.Button iconPlacement="right" icon={<WaitlistIcon />}>
                Waitlist
            </ButtonGroup.Button>
        </ButtonGroup>
    );
};

export default ButtonGroupStories;
