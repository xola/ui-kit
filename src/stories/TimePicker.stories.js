import React, { Fragment } from "react";
import { TimePicker } from "..";

export default {
    title: "TimePicker",
};

export const Default = () => {
    return <TimePicker onChange={(value) => console.log(value)} />;
};

export const WithValue = () => {
    return <TimePicker value={1825} onChange={(value) => console.log(value)} />;
};
