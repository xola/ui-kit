import React from "react";

const FontsStories = {
    title: "Configuration/Fonts",
};

export const Fonts = () => {
    return (
        <div className="space-y-4">
            <div>
                <a href="https://fonts.google.com/specimen/Inter?query=Inter" className="mb-1 block text-primary">
                    Font: Inter
                </a>
                <p>
                    This is <b>default font paragraph</b>. Yogi Bear is smarter than the average bear, Yogi Bear is
                    always in the ranger&apos;s hair. At a picnic table you will find him there, stuffing down more
                    goodies than the average bear. He will sleep till noon but before it&apos;s dark, he&apos;ll have
                    every picnic basket that&apos;s in Jellystone Park. Yogi has it better than a millionaire.
                    That&apos;s because he&apos;s smarter than the average bear!
                </p>
            </div>
            <div>
                <a href="https://fonts.google.com/specimen/Roboto+Mono" className="mb-1 block text-primary">
                    Font: Roboto Mono
                </a>
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
