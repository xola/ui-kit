import { map, omitBy } from "lodash";
import React from "react";
import * as all from "../..";

const iconNames = omitBy(all, (Icon, name) => !name.endsWith("Icon"));
const icons = map(iconNames, (Icon, name) => ({ Icon, name }));

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
    let currentLetter = "";
    return (
        <div className="flex flex-row flex-wrap gap-3">
            {icons.map(({ Icon, name }) => {
                const firstLetter = name.slice(0, 1);
                const isNew = firstLetter !== currentLetter;
                if (isNew) {
                    currentLetter = firstLetter;
                }

                return (
                    <React.Fragment key={name}>
                        {isNew && <div className="flex-grow mt-3 w-full text-lg font-bold">{firstLetter}</div>}
                        <div className="p-2 space-y-2 text-center rounded border border-gray-lighter">
                            <Icon size={size} className={color} />
                            <div className="w-40 text-gray-dark">{name}</div>
                        </div>
                    </React.Fragment>
                );
            })}
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
