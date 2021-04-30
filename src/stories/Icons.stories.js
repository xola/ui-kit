import React from "react";
import * as all from "..";
import _ from "lodash";
import clsx from "clsx";

const icons = _.filter(all, (component, name) => name.endsWith("Icon"));

const sizes = {
    small: "w-3.5 h-3.5", // 14px
    medium: "w-[18px] h-[18px]", // 18px
    large: "w-8 h-8", // 32px -- Only specific icons. Need answer from Barth
    old: "w-10 h-10",
};

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

export default {
    title: "Components/Others/Icons",
    argTypes: {
        color: {
            description: "Colors",
            defaultValue: "text-black",
            table: {
                type: { summary: null },
                defaultValue: { summary: "text-black" },
            },
            options: colors,
            control: { type: "select" },
        },
    },
};

export const Default14Px = ({ color }) => {
    return (
        <div className="flex flex-row flex-wrap gap-3">
            {icons.map((Icon, index) => (
                <div className="p-2 text-center border rounded border-gray-lighter" key={index}>
                    <Icon className={clsx("inline-block w-6 h-6 mb-2", sizes.small, color)} />
                    <div className="w-40 text-gray-dark">{Icon.displayName}</div>
                </div>
            ))}
        </div>
    );
};

export const Medium18px = ({ color }) => {
    return (
        <div className="flex flex-row flex-wrap gap-8">
            {icons.map((Icon, index) => (
                <div className="p-2 text-center border rounded border-gray-lighter" key={index}>
                    <Icon className={clsx("inline-block mb-2", sizes.medium, color)} />
                    <div className="w-40 text-gray-dark">{Icon.displayName}</div>
                </div>
            ))}
        </div>
    );
};

export const Large32px = ({ color }) => {
    return (
        <div className="flex flex-row flex-wrap gap-8">
            {icons.map((Icon, index) => (
                <div className="p-2 text-center border rounded border-gray-lighter" key={index}>
                    <Icon className={clsx("inline-block w-10 h-10 mb-2", sizes.large, color)} />
                    <div className="w-40 text-gray-dark">{Icon.displayName}</div>
                </div>
            ))}
        </div>
    );
};
