import React from "react";

export default {
    title: "Components/Text/Links",
};

export const Default = () => {
    return (
        <div className="space-y-4">
            <a href="https://xola.com" target="_blank" className="text-md font-semibold text-primary">
                Link with Colors
            </a>
            <br />
            <a href="https://xola.com" target="_blank" className="text-md font-semibold">
                Link L1
            </a>
            <br />
            <a href="https://xola.com" target="_blank" className="text-base font-semibold">
                Link L2
            </a>
            <br />
            <a href="https://xola.com" target="_blank" className="text-sm font-semibold">
                Link L3
            </a>
        </div>
    );
};
