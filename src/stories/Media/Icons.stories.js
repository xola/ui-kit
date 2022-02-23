import { map, omitBy } from "lodash";
import React, { useState } from "react";
import * as all from "../..";
import { Input } from "../..";

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
    const [search, setSearch] = useState("");
    const [filteredIcons, setFilteredIcons] = useState(icons);

    const handleSearch = (e) => {
        const { value } = e.target;
        setSearch(value);

        if (value.trim().length === 0) {
            setFilteredIcons(icons);
        } else {
            const matching = icons.filter(({ Icon, name }) => {
                const re = new RegExp(`${value}`, "gi");
                const tags = Icon.tags ?? [];
                return re.test(name) || tags.some((tag) => re.test(tag));
            });
            setFilteredIcons(matching);
        }
    };

    return (
        <div className="flex flex-row flex-wrap gap-3">
            <div className="relative w-full">
                <Input
                    type="search"
                    placeholder="Filter icons"
                    value={search}
                    className="pl-7"
                    onChange={handleSearch}
                />
                <all.SearchIcon className="!absolute left-2 top-3" />
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
                        <div className="space-y-2 rounded border border-gray-lighter p-2 text-center">
                            <Icon size={size} className={color} />
                            <div className="w-40 text-gray-dark">{name}</div>
                        </div>
                    </React.Fragment>
                );
            })}
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
