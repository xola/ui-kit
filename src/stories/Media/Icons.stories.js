import clsx from "clsx";
import _ from "lodash";
import React from "react";
import * as all from "../..";
import { iconSizes } from "../../icons/iconSizes.js";

const icons = _.filter(all, (component, name) => name.endsWith("Icon"));

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
        color: "text-black"
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

const wrapperClasses = "p-2 text-center rounded border border-gray-lighter space-y-2";
const defaultIconClasses = "inline-block"; // TODO: Make this default in the icon lib only
export const Default14Px = ({ color }) => {
    return (
        <div className="flex flex-row flex-wrap gap-3">
            {icons.map((Icon) => (
                <div key={Icon.displayName} className={wrapperClasses}>
                    <Icon className={clsx(defaultIconClasses, iconSizes.small, color)} />
                    <div className="w-40 text-gray-dark">{Icon.displayName}</div>
                </div>
            ))}
        </div>
    );
};

export const Medium18px = ({ color }) => {
    return (
        <div className="flex flex-row flex-wrap gap-8">
            {icons.map((Icon) => (
                <div key={Icon.displayName} className={wrapperClasses}>
                    <Icon className={clsx(defaultIconClasses, iconSizes.medium, color)} />
                    <div className="w-40 text-gray-dark">{Icon.displayName}</div>
                </div>
            ))}
        </div>
    );
};

export const Large24px = ({ color }) => {
    return (
        <div className="flex flex-row flex-wrap gap-8">
            {icons.map((Icon) => (
                <div key={Icon.displayName} className={wrapperClasses}>
                    <Icon className={clsx(defaultIconClasses, iconSizes.large, color)} />
                    <div className="w-40 text-gray-dark">{Icon.displayName}</div>
                </div>
            ))}
        </div>
    );
};

export default IconsStories;
