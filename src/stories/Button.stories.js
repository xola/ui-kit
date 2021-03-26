import React from "react";
import { Button } from "..";

export default {
    title: "Button",
    component: Button,
    argTypes: {
        backgroundColor: { control: "color" },
    },
};

export const Default = (props) => {
    return <Button {...props}>Hello</Button>;
};
