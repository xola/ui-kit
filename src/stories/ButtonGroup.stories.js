import React, { useState } from "react";
import { ButtonGroup } from "..";

const ButtonGroupStories = {
    title: "Components/ButtonGroup",
    component: ButtonGroup,
    argTypes: {
        size: {
            defaultValue: "medium",
            options: ["small", "medium", "large"],
            control: { type: "radio" },
            table: {
                defaultValue: { summary: "medium" },
            },
        },
    },
};

export const Default = ({ size }) => {
    const [active, setActive] = useState(-1);

    return (
        <ButtonGroup size={size} value={active} onChange={(index) => setActive(index)}>
            <ButtonGroup.Button>First</ButtonGroup.Button>
            <ButtonGroup.Button>Second</ButtonGroup.Button>
            <ButtonGroup.Button>Third</ButtonGroup.Button>
        </ButtonGroup>
    );
};

export default ButtonGroupStories;
