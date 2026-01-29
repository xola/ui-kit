// @ts-nocheck
import React from "react";
import { theme } from "../../theme";
import cn from "../../helpers/classnames";

const ColorsStories = {
    title: "Configuration/Colors",
    parameters: {
        design: {
            name: "Figma",
            type: "figma",
            url: "https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=2855%3A99352&viewport=3792%2C737%2C0.13",
        },
    },
};

const { colors } = theme;

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
                    <Color key={key} prefix={prefix} name={name} color={key} hex={value} className={className} />
                ) : (
                    <div key={key} className="my-6 border-t border-gray-lighter pt-4">
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
    const colorName = name ? `-${name}` : "";
    const key = color === "DEFAULT" ? colorName : `${colorName}-${color}`;

    return (
        <div className={cn("flex flex-col font-mono text-sm", className)}>
            <div className="h-10 w-10 rounded-full border border-gray-lighter" style={{ backgroundColor: hex }}>
                &nbsp;
            </div>
            {prefix}
            {key} {hex}
        </div>
    );
};

export default ColorsStories;
