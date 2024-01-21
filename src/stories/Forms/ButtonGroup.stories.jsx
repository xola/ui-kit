import React, { useState } from "react";
import { ButtonGroup, ChecklistIcon, EmptyChecklistIcon, MixedChecklistIcon, WaitlistIcon } from "../..";
import { inlineRadioOptions, sizeParams, tableDefault } from "../helpers";

export default {
    title: "Forms & Fields/ButtonGroup",
    component: ButtonGroup,
    tags: ["autodocs"],
    parameters: {
        design: {
            name: "Figma",
            type: "figma",
            url: "https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=7456%3A467977",
        },
    },
    args: {
        size: "medium",
        value: 1,
    },
    argTypes: {
        iconPlacement: inlineRadioOptions(["left", "right"], tableDefault("left")),
        isCollapsed: {
            if: { arg: "icon", truthy: true },
        },
        size: sizeParams,
        value: {
            description: "An integer from 0 onwards to indicate which button is active. Defaults to `null`",
            control: { type: "number" },
            ...tableDefault(null),
        },
    },
};

export const Default = {
    render: ({ size, value, ...rest }) => {
        const [active, setActive] = useState(value);

        return (
            <ButtonGroup {...rest} size={size} value={active} onChange={(index) => setActive(index)}>
                <ButtonGroup.Button>First</ButtonGroup.Button>
                <ButtonGroup.Button>Second</ButtonGroup.Button>
                <ButtonGroup.Button>Third</ButtonGroup.Button>
            </ButtonGroup>
        );
    },
};

export const WithIcons = {
    args: {
        size: "medium",
        iconPlacement: "left",
        value: 1,
    },
    render: ({ size, value, iconPlacement }) => {
        const [active, setActive] = useState(value);

        return (
            <ButtonGroup
                size={size}
                value={active}
                iconPlacement={iconPlacement}
                onChange={(index) => setActive(index)}
            >
                <ButtonGroup.Button>Reserved</ButtonGroup.Button>
                <ButtonGroup.Button icon={<WaitlistIcon />}>Waitlist</ButtonGroup.Button>
                <ButtonGroup.Button isHidden icon={<EmptyChecklistIcon />}>
                    Available
                </ButtonGroup.Button>
                <ButtonGroup.Button icon={<MixedChecklistIcon />}>All</ButtonGroup.Button>
            </ButtonGroup>
        );
    },
};

export const Collapsible = {
    render: ({ size, value }) => {
        const [active, setActive] = useState(value);

        return (
            <ButtonGroup isCollapsed size={size} value={active} onChange={(index) => setActive(index)}>
                <ButtonGroup.Button icon={<ChecklistIcon />}>Reserved</ButtonGroup.Button>
                <ButtonGroup.Button icon={<WaitlistIcon />}>Waitlist</ButtonGroup.Button>
                <ButtonGroup.Button icon={<EmptyChecklistIcon />}>Available</ButtonGroup.Button>
                <ButtonGroup.Button icon={<MixedChecklistIcon />}>All</ButtonGroup.Button>
            </ButtonGroup>
        );
    },
};

export const CollapsibleWithTextFallback = {
    render: ({ size, value }) => {
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
    },
};
