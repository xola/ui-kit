import React from "react";
import { Spinner } from "../..";
import { inlineRadioOptions, selectOptions } from "../helpers";
import { spinnerColors, spinnerSizes } from "../../components/Spinner";

const SpinnerStories = {
    title: "Other/Spinner",
    component: Spinner,
    tags: ["autodocs"],
    args: {
        color: "secondary",
        size: "small",
    },
    argTypes: {
        color: selectOptions(Object.keys(spinnerColors)),
        size: inlineRadioOptions(Object.keys(spinnerSizes)),
    },
};

export const Default = (props) => {
    return <Spinner {...props} />;
};

export const Sizes = () => {
    return (
        <div className="space-x-8">
            {Object.keys(spinnerSizes).map((size) => (
                <Spinner size={size} />
            ))}
        </div>
    );
};

export default SpinnerStories;
