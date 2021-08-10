import _ from "lodash";
import React from "react";
import * as all from "../..";

const iconNames = _.omitBy(all, (Icon, name) => !name.endsWith("Icon"));
const icons = _.map(iconNames, (Icon, name) => ({ Icon, name }));

const colors = [
    "text-black",
    "text-gray-dark",
    "text-white",
    "text-primary",
    "text-secondary",
    "text-success",
    "text-warning",
    "text-danger",
];

const IconsStories = {
    title: "Media/Icons",
    args: {
        color: "text-black",
    },
    argTypes: {
        color: {
            description: "Colors",
            table: {
                type: { summary: null },
                defaultValue: { summary: "text-black" },
            },
            options: colors,
            control: { type: "select" },
        },
    },
};

const IconList = ({ size, color }) => {
    return (
        <div className="flex flex-row flex-wrap gap-3">
            {icons.map(({ Icon, name }) => (
                <div key={name} className="p-2 text-center rounded border border-gray-lighter space-y-2">
                    <Icon size={size} className={color} />
                    <div className="w-40 text-gray-dark">{name}</div>
                </div>
            ))}
        </div>
    );
};

export const Default14Px = ({ color }) => {
    return <IconList color={color} size="small" />;
};

export const Medium18px = ({ color }) => {
    return <IconList color={color} size="medium" />;
};

export const Large24px = ({ color }) => {
    return <IconList color={color} size="large" />;
};

export default IconsStories;
