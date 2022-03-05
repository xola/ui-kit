import React from "react";

const TextStories = {
    title: "Configuration/Text",
};

export const Text = () => {
    return (
        <div className="flex flex-row space-x-8">
            <div className="flex flex-col space-y-4">
                <span className="text-xs">text-xs (10px)</span>
                <span className="text-sm">text-sm (12px)</span>
                <span className="text-base">text-base (14px)</span>
                <span className="text-md">text-md (16px)</span>
                <span className="text-lg">text-lg (18px)</span>
                <span className="text-xl">text-xl (21px)</span>
                <span className="text-2xl">text-2xl (24px)</span>
            </div>
            <div className="flex flex-col space-y-6">
                <h1>
                    Heading <span className="font-mono">&lt;h1&gt;</span> (24px)
                </h1>
                <h2>
                    Heading <span className="font-mono">&lt;h2&gt;</span> (21px)
                </h2>
                <h3>
                    Heading <span className="font-mono">&lt;h3&gt;</span> (18px)
                </h3>
                <h4>
                    Heading <span className="font-mono">&lt;h4&gt;</span> (16px)
                </h4>
                <h5>
                    Heading <span className="font-mono">&lt;h5&gt;</span> (14px)
                </h5>
                <h6>
                    Heading <span className="font-mono">&lt;h6&gt;</span> (12px)
                </h6>
            </div>
        </div>
    );
};

export default TextStories;
