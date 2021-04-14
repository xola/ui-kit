import React, { useState } from "react";
import clsx from "clsx";
import { Button } from "..";
import { Tooltip } from "..";

export default {
    title: "Tooltip",
    component: Tooltip,
};

export const Hover = () => {
    const offset = [0, 15];
    const isVisible = true;
    return (
        <Tooltip text="Lorem Ipsum" trigger="hover" placement="bottom" offset={offset}>
            <Button>Hover over me</Button>
        </Tooltip>
    );
};

export const Click = () => {
    return (
        <Tooltip text="Lorem Ipsum" trigger="click" placement="right">
            <Button>Click Me</Button>
        </Tooltip>
    );
};
