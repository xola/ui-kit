import { map, omitBy } from "lodash";
import React from "react";
import * as all from "../..";

const imageNames = omitBy(all, (Image, name) => !name.endsWith("Image"));
const images = map(imageNames, (Image, name) => ({ Image, name }));

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

const ImagesStories = {
    title: "Media/Images",
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

const ImageList = ({ color }) => {
    let currentLetter = "";
    return (
        <div className="flex flex-row flex-wrap gap-3">
            {images.map(({ Image, name }) => {
                const firstLetter = name.slice(0, 1);
                const isNew = firstLetter !== currentLetter;
                if (isNew) {
                    currentLetter = firstLetter;
                }

                return (
                    <React.Fragment key={name}>
                        {isNew && <div className="mt-3 w-full flex-grow text-lg font-bold">{firstLetter}</div>}
                        <div className="space-y-2 rounded border border-gray-lighter p-2 text-center">
                            <div className="flex justify-center">
                                <Image className={color} />
                            </div>
                            <div className="w-40 text-gray-dark">{name}</div>
                        </div>
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export const Images = ({ color }) => {
    return <ImageList color={color} size="large" />;
};

export default ImagesStories;
