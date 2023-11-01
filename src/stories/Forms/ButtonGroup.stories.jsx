import React, { useState } from "react";
import { ButtonGroup, ChecklistIcon, EmptyChecklistIcon, MixedChecklistIcon, WaitlistIcon } from "../..";

export default {
    title: "Forms & Fields/ButtonGroup",
    component: ButtonGroup,
    args: {
        size: "medium",
    },
    parameters: {
        design: {
            name: "Figma",
            type: "figma",
            url: "https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=7456%3A467977",
        },
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
            <ButtonGroup.Button>Reserved</ButtonGroup.Button>
            <ButtonGroup.Button icon={<WaitlistIcon />}>Waitlist</ButtonGroup.Button>
            <ButtonGroup.Button isHidden icon={<EmptyChecklistIcon />}>
                Available
            </ButtonGroup.Button>
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

export const CollapsibleWithTextFallback = ({ size, value = 0 }) => {
    const [active, setActive] = useState(value);

    return (
        <ButtonGroup isCollapsed size={size} value={active} onChange={(index) => setActive(index)}>
            <ButtonGroup.Button>Reserved</ButtonGroup.Button>
            <ButtonGroup.Button icon={<WaitlistIcon />}>Waitlist</ButtonGroup.Button>
            <ButtonGroup.Button isHidden icon={<EmptyChecklistIcon />}>
                Available
            </ButtonGroup.Button>
            <ButtonGroup.Button icon={<MixedChecklistIcon />}>All</ButtonGroup.Button>
        </ButtonGroup>
    );
};
