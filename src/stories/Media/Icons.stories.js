import React from "react";
import _ from "lodash";
import clsx from "clsx";
import * as all from "../..";

const icons = _.filter(all, (component, name) => name.endsWith("Icon"));

const sizes = {
    small: "w-3.5 h-3.5", // 14px
    medium: "w-[18px] h-[18px]", // 18px
    large: "w-8 h-8", // 32px -- Only specific icons. Need answer from Barth
    old: "w-10 h-10",
};

/**
 * ok so let me summaries this:
Small - 1px thickness
Medium - 1.3px thickness
Big - 1.5px thickness
 */

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

const wrapperClasses = "p-2 text-center rounded border border-gray-lighter space-y-2";
const defaultIconClasses = "inline-block"; // TODO: Make this default in the icon lib only
export const Default14Px = ({ color }) => {
    return (
        <div className="flex flex-row flex-wrap gap-3">
            {icons.map((Icon) => (
                <div key={Icon.displayName} className={wrapperClasses}>
                    <Icon className={clsx(defaultIconClasses, sizes.small, color)} />
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
                    <Icon className={clsx(defaultIconClasses, sizes.medium, color)} />
                    <div className="w-40 text-gray-dark">{Icon.displayName}</div>
                </div>
            ))}
        </div>
    );
};

export const Large32px = ({ color }) => {
    return (
        <div className="flex flex-row flex-wrap gap-8">
            {icons.map((Icon) => (
                <div key={Icon.displayName} className={wrapperClasses}>
                    <Icon className={clsx(defaultIconClasses, sizes.large, color)} />
                    <div className="w-40 text-gray-dark">{Icon.displayName}</div>
                </div>
            ))}
        </div>
    );
};

export default IconsStories;
