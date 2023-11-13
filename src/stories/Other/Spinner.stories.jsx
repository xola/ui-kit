import React from "react";
import { Spinner } from "../..";
import { inlineRadio, select } from "../helpers";
import { colors, sizes } from "../../components/Spinner";

const SpinnerStories = {
    title: "Other/Spinner",
    component: Spinner,
    tags: ["autodocs"],
    args: {
        color: "secondary",
        size: "small",
    },
    argTypes: {
        color: select(Object.keys(colors)),
        size: inlineRadio(Object.keys(sizes)),
    },
};

export const Default = (props) => {
    return <Spinner {...props} />;
};

export const Sizes = () => {
    return (
        <div className="space-x-8">
            {Object.keys(sizes).map((size) => (
                <Spinner size={size} />
            ))}
        </div>
    );
};

export default SpinnerStories;
