import clsx from "clsx";
import React from "react";
import twConfig from "../../../tailwind.config";

const ColorsStories = {
    title: "Configuration/Colors",
};

const { colors } = twConfig.theme;

export const Colors = () => {
    return (
        <div>
            <div className="rounded bg-gray-lighter p-2">
                Click on the little picture icon to switch between a light and dark background to see the colors
            </div>
            <div className="my-4">
                <ProcessColor colors={colors} prefix="bg" className="my-6" />
            </div>
        </div>
    );
};

const ProcessColor = ({ name, prefix, colors, className = "" }) => {
    const keys = Object.keys(colors).reverse();
    return (
        <>
            {keys.map((key) => {
                const value = colors[key];
                return typeof value === "string" ? (
                    <Color prefix={prefix} name={name} color={key} hex={value} className={className} />
                ) : (
                    <div className="my-6 border-t border-gray-lighter pt-4">
                        <div className="font-bold uppercase">{key ?? ""}</div>
                        <div className="grid w-[700px] grid-cols-3 gap-x-2 gap-y-4 xl:gap-4 2xl:w-full 2xl:grid-cols-6">
                            <ProcessColor prefix={prefix} name={key} colors={value} className="my-2" />
                        </div>
                    </div>
                );
            })}
        </>
    );
};

const Color = ({ prefix = "bg", name, color, hex, className = "" }) => {
    const n = name ? `-${name}` : "";
    const key = color === "DEFAULT" ? n : `${n}-${color}`;
    console.log("Color", name, color, hex, key);

    return (
        <div className={clsx("flex flex-col font-mono text-sm", className)}>
            <div className="h-10 w-10 rounded-full border border-gray-lighter" style={{ backgroundColor: hex }}>
                &nbsp;
            </div>
            {prefix}
            {key} {hex}
        </div>
    );
};

export default ColorsStories;
