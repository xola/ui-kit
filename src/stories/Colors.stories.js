import clsx from "clsx";
import React from "react";

const ColorsStories = {
    title: "Data Display/Colors",
};

const bgColors = [
    "bg-red-dark",
    "bg-red",
    "bg-red-light",
    "bg-red-lighter",
    "bg-blue-darker",
    "bg-blue-dark",
    "bg-blue",
    "bg-blue-light",
    "bg-blue-lighter",
    "bg-green-dark",
    "bg-green",
    "bg-green-light",
    "bg-green-lighter",
    "bg-yellow-dark",
    "bg-yellow",
    "bg-yellow-light",
    "bg-yellow-lighter",
    "bg-orange-dark",
    "bg-orange",
    "bg-orange-light",
    "bg-orange-lighter",
    "bg-gray-darker",
    "bg-gray-dark",
    "bg-gray",
    "bg-gray-light",
    "bg-gray-lighter",
];

export const BackgroundColors = () => {
    const components = [];
    for (const color of bgColors) {
        const component = (
            <div key={color}>
                <div className={clsx(`w-6 h-6 rounded-full ${color}`)} />
                <span className="font-mono">{color}</span>
            </div>
        );
        components.push(component);
    }

    return <div className="grid grid-cols-3 gap-4 w-full">{components}</div>;
};

const textColors = [
    "text-red-dark",
    "text-red",
    "text-red-light",
    "text-red-lighter",
    "text-blue-darker",
    "text-blue-dark",
    "text-blue",
    "text-blue-light",
    "text-blue-lighter",
    "text-green-dark",
    "text-green",
    "text-green-light",
    "text-green-lighter",
    "text-yellow-dark",
    "text-yellow",
    "text-yellow-light",
    "text-yellow-lighter",
    "text-orange-dark",
    "text-orange",
    "text-orange-light",
    "text-orange-lighter",
    "text-gray-darker",
    "text-gray-dark",
    "text-gray",
    "text-gray-light",
    "text-gray-lighter",
];

export const TextColors = () => {
    const components = [];
    for (const color of textColors) {
        const component = (
            <div key={color} className="flex flex-row space-x-5">
                <span className={clsx(color, "font-mono")}>{color}</span>
            </div>
        );

        components.push(component);
    }

    components.push(
        <div key="text-black" className="flex flex-row space-x-5">
            <span className={clsx("text-black", "font-mono")}>text-black</span>
        </div>,
        <div key="text-white" className="flex flex-row space-x-5">
            <span className={clsx("text-white bg-gray", "font-mono")}>text-white</span>
        </div>,
    );

    return <div className="grid grid-cols-3 gap-4">{components}</div>;
};

export default ColorsStories;
