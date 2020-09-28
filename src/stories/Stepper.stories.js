import { Stepper, Step } from "..";
import React from "react";

export default {
    title: "Stepper",
    component: Stepper,
};

export const Default = () => {
    return (
        <Stepper>
            <Step label="Basic Info" current>
                1
            </Step>

            <Step label="Feature Menu">2</Step>
            <Step label="Use Xola">3</Step>
        </Stepper>
    );
};

export const Resized = () => {
    return (
        <Stepper size={40}>
            <Step label="Basic Info" done>
                1
            </Step>

            <Step label="Feature Menu" current>
                2
            </Step>

            <Step label="Use Xola">3</Step>
        </Stepper>
    );
};
