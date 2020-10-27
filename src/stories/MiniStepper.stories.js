import React from "react";
import { MiniStepper } from "..";

export default {
    title: "MiniStepper",
    component: MiniStepper,
};

export const Default = () => {
    return <MiniStepper count={10} value={3} />;
};

export const Resized = () => {
    return <MiniStepper count={10} value={3} size={30} />;
};
