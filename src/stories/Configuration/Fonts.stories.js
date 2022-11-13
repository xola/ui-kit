import React from "react";
import twConfig from "../../../tailwind.config";

const FontsStories = {
    title: "Configuration/Fonts",
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=2855%3A99412&viewport=7782%2C1364%2C0.44",
        },
    },
};

export const Fonts = () => {
    const { sans } = twConfig.theme.extend.fontFamily;
    const { mono } = twConfig.theme.extend.fontFamily;
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <a
                    href="https://fonts.google.com/specimen/Inter?query=Inter"
                    className="mb-1 block text-primary hover:underline"
                >
                    Font: Inter
                </a>
                <div className="mb-2 pl-4 font-mono text-sm">font-family: &apos;{sans.join(", ")}&apos;</div>
                <p>
                    This is <b>default font paragraph</b>. Yogi Bear is smarter than the average bear, Yogi Bear is
                    always in the ranger&apos;s hair. At a picnic table you will find him there, stuffing down more
                    goodies than the average bear. He will sleep till noon but before it&apos;s dark, he&apos;ll have
                    every picnic basket that&apos;s in Jellystone Park. Yogi has it better than a millionaire.
                    That&apos;s because he&apos;s smarter than the average bear!
                </p>
            </div>
            <div className="space-y-2">
                <a
                    href="https://fonts.google.com/specimen/Roboto+Mono"
                    className="mb-1 block text-primary hover:underline"
                >
                    Font: Roboto Mono
                </a>
                <div className="mb-2 pl-4 font-mono text-sm">font-family: &apos;{mono.join(", ")}&apos;</div>
                <p className="font-mono">
                    This is <b>mono font paragraph</b>. Yogi Bear is smarter than the average bear, Yogi Bear is always
                    in the ranger&apos;s hair. At a picnic table you will find him there, stuffing down more goodies
                    than the average bear. He will sleep till noon but before it&apos;s dark, he&apos;ll have every
                    picnic basket that&apos;s in Jellystone Park. Yogi has it better than a millionaire. That&apos;s
                    because he&apos;s smarter than the average bear!
                </p>
            </div>
        </div>
    );
};

export default FontsStories;
