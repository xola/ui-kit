import React, { useState } from "react";
import { ButtonGroup } from "..";

export default {
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
        <ButtonGroup size={size}>
            <ButtonGroup.Button isActive={active === 0} onClick={() => setActive(0)}>
                First
            </ButtonGroup.Button>

            <ButtonGroup.Button isActive={active === 1} onClick={() => setActive(1)}>
                Second
            </ButtonGroup.Button>

            <ButtonGroup.Button isActive={active === 2} onClick={() => setActive(2)}>
                Third
            </ButtonGroup.Button>
        </ButtonGroup>
    );
};
