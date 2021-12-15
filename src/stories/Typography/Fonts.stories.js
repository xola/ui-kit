import React from "react";

const FontsStories = {
    title: "Typography/Fonts",
};

export const Default = () => {
    return (
        <div className="space-y-4">
             <p className="p3">
                This is <b>default font paragraph</b>. Yogi Bear is smarter than the average bear, Yogi Bear is always in the
                ranger&apos;s hair. At a picnic table you will find him there, stuffing down more goodies than the
                average bear. He will sleep till noon but before it&apos;s dark, he&apos;ll have every picnic basket
                that&apos;s in Jellystone Park. Yogi has it better than a millionaire. That&apos;s because he&apos;s
                smarter than the average bear!
            </p>
            <p className="font-mono p3">
                This is <b>mono font paragraph</b>. Yogi Bear is smarter than the average bear, Yogi Bear is always in the
                ranger&apos;s hair. At a picnic table you will find him there, stuffing down more goodies than the
                average bear. He will sleep till noon but before it&apos;s dark, he&apos;ll have every picnic basket
                that&apos;s in Jellystone Park. Yogi has it better than a millionaire. That&apos;s because he&apos;s
                smarter than the average bear!
            </p>
        </div>
    );
};

export default FontsStories;
