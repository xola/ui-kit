import { map, omitBy } from "lodash";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import * as all from "../../icons/";
import { flash, Input } from "../..";

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
    parameters: {
        design: {
            name: "Figma",
            type: "figma",
            url: "https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=384%3A0&viewport=4979%2C1071%2C0.31",
        },
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
    const [search, setSearch] = useState("");

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const filteredIcons = icons.filter(({ Icon, name }) => {
        if (!search) {
            return true;
        }

        if (search.trim().length === 0) {
            return true;
        }

        const re = new RegExp(`${search}`, "gi");
        const tags = Icon.tags ?? [];
        return re.test(name) || tags.some((tag) => re.test(tag));
    });

    const handleClick = (name) => {
        navigator.clipboard.writeText(name);
        flash.show({
            text: (
                <>
                    Copied <span className="font-mono">{name}</span> to your clipboard
                </>
            ),
            color: "success",
        });
    };

    return (
        <div className="flex flex-row flex-wrap gap-3">
            <div className="sticky top-2 z-50 w-full bg-white opacity-90">
                <Input
                    type="search"
                    placeholder="Filter icons by name or tags"
                    value={search}
                    className="pl-7"
                    onChange={handleSearch}
                />
                <all.SearchIcon className="!absolute left-2 top-3" />
                <p className="my-4">Click on an icon to copy the name</p>
            </div>

            {filteredIcons.map(({ Icon, name }) => {
                const firstLetter = name.slice(0, 1);
                const isNew = firstLetter !== currentLetter;
                if (isNew) {
                    currentLetter = firstLetter;
                }

                return (
                    <React.Fragment key={name}>
                        {isNew && <div className="mt-3 w-full flex-grow text-lg font-bold">{firstLetter}</div>}
                        <div
                            className="space-y-2 rounded border border-gray-lighter p-2 text-center hover:cursor-pointer hover:bg-gray-hover"
                            title="Click to copy name"
                            onClick={() => handleClick(name)}
                        >
                            <Icon size={size} className={color} />
                            <div className="w-40 font-mono text-gray-dark">{name}</div>
                            <div title="tags" className="w-40 whitespace-normal text-xs text-gray">
                                {Icon.tags?.join(", ")}
                            </div>
                        </div>
                    </React.Fragment>
                );
            })}

            <Toaster />
        </div>
    );
};

export const Tiny12Px = ({ color }) => {
    return <IconList color={color} size="tiny" />;
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
